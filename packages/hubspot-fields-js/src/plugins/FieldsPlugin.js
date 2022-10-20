const fs = require('fs');
const glob = require('glob');
const path = require('path'); // Use path to ensure files are resolved correctly across all OS

const {
	getFilesToTransform,
	transformDataToJsonFromJsFile,
	writeJsonToFile,
	clearFileFromCache
} = require('../lib/FieldTransformer');
const pluginName = 'FieldsPlugin';

class FieldsPlugin {

	constructor(options = {}) {
		this.options = Object.assign({
			src: "",
			extraDirsToWatch: [],
			ignore: []
		}, options);

		// Set for Later
		this.modifiedFiles = []
		this.foldersToIgnore = []
		this.directoriesToWatch = []
	}

	listExtraDirectoriesToWatch({ baseDirPath }) {
		let toWatch = []
		// Get from options
		let watchDirs = this.options.extraDirsToWatch
		watchDirs = Array.isArray(watchDirs) ? watchDirs : watchDirs.split(',')
		// Return
		watchDirs
			.forEach(context => { toWatch.push(path.resolve(baseDirPath, context)) })
		return [... new Set(toWatch.filter(d => !!d))]
	}

	listFoldersToIgnore({ baseDirPath }) {
		let ignore = []
		// Get from options
		let ignoreDirs = this.options.ignore
		ignoreDirs = Array.isArray(ignoreDirs) ? ignoreDirs : ignoreDirs.split(',')
		// Return
		ignoreDirs
			.concat(['./dist/**', './node_modules/**'])
			.forEach(context => { ignore.push(path.resolve(baseDirPath, context)) })
		return [... new Set(ignore.filter(d => !!d))]
	}

	/**
	 * Handle it now so fields.js is not uploaded to HubSpot because hsAutouploadPlugin looks for this to be emitted: true in order to upload
	 */
	stopJsUploadToHubspot(compilation, { JsDistRelativePath, JsonDistRelativePath, JsonDistFullPath }) {
		// Removes leading slashes from the assets to avoid upload errors
		JsonDistRelativePath = (JsonDistRelativePath.substring(0, 1) === '/') ? JsonDistRelativePath.substring(1) : JsonDistRelativePath;
		// Delete Js to replace with JSON
		delete compilation.assets[JsDistRelativePath];
		// Add in the newly created json into assets so hubSpot will report it
		compilation.assets[JsonDistRelativePath] = {
			size: function () { return Buffer.byteLength(JsonDistFullPath) },
			source: function () { return Buffer.from(JsonDistFullPath) },
			existsAt: JsonDistFullPath,
			emitted: true
		}
		// remove fields.js from emittedAssets Set
		compilation.emittedAssets.delete(JsDistRelativePath)
		// add json version to emittedAssets set. Functionally tricks AutoUplaoder into thinking that this file was updated as part of the actual webpack process
		compilation.emittedAssets.add(JsonDistRelativePath)
	}

	async apply(compiler) {

		// Set 
		let isFirstCompile = true
		this.foldersToIgnore = this.listFoldersToIgnore({ baseDirPath: compiler.context })
		this.directoriesToWatch = this.listExtraDirectoriesToWatch({ baseDirPath: compiler.context })

		// When watching, update the modie
		compiler.hooks.watchRun.tap(pluginName, compilation => {
			this.modifiedFiles = compilation.modifiedFiles ? Array.from(compilation.modifiedFiles) : [];
		});

		// Set Extra directories to watch
		compiler.hooks.afterCompile.tap(pluginName, compilation => {
			this.directoriesToWatch.forEach(dir => { compilation.contextDependencies.add(dir) })
		})

		// Transform the fields.json
		compiler.hooks.afterEmit.tapPromise(pluginName, async compilation => {
			//
			const webpackLogger = compiler.getInfrastructureLogger(pluginName);
			const webpackRoot = compilation.options.context
			const distFolder = compilation.options.output.path;
			
			let lookInFolders = Array.isArray(this.options.src) ? this.options.src : [this.options.src]
			lookInFolders = lookInFolders.map(src => path.resolve(webpackRoot, src))

			// Handle fields.js file
			return await new Promise((resolve, reject) => {

				// Get Files
				let files = getFilesToTransform({
					pathToDir: lookInFolders,
					ignore: this.foldersToIgnore
				})
				
				// Find every modules fields.js file.
				files.forEach(JsSrcFullPath => {
					try {
						
						// Get the module path for matching
						let fileUniqueKey = JsSrcFullPath.split("/").slice(-2).join('/');
						// Get the path from the DIST folder for the asset
						let JsDistRelativePath = Object.keys(compilation.assets).find(a => a.endsWith(fileUniqueKey)) || ''
						
						// Only transform if file was emitted
						if (!JsDistRelativePath) { return true; }

						// If JS file was found in the emitted assets then we should handle it for webpack 
						let fileWasEmitted = (Array.from(compilation.emittedAssets).indexOf(JsDistRelativePath) > -1)
						let shouldTransform = fileWasEmitted || isFirstCompile;

						// Check if a file in one of our additional directories was modified
						if (!shouldTransform) {
							shouldTransform = this.modifiedFiles.some(path => {
								if (this.directoriesToWatch.includes(path)) { 
									Object.keys(require.cache).forEach(key => {
										if (key.startsWith(path)) {
											delete require.cache[key]
										}
									})
									return true
								}
								return false
							})
							if (!shouldTransform) { return; }
						}

						// Transform
						let fieldsJson = transformDataToJsonFromJsFile(JsSrcFullPath)

						// Get path for json file in output
						let JsonDistRelativePath = JsDistRelativePath.replace('fields.js', 'fields.json');
						let JsonDistFullPath = path.resolve(distFolder, './' + JsonDistRelativePath);
						
						// 
						if (writeJsonToFile(JsonDistFullPath, fieldsJson)) {
							// Use the Logger interface like HubSpot		
							let folderLog = ''
							let folderFoundIn = lookInFolders[0]
							if (lookInFolders.length > 1) {
								folderFoundIn = lookInFolders.find(dir => JsSrcFullPath.startsWith(dir))
								folderLog = ` found in /${path.relative(webpackRoot, folderFoundIn)}`
							}
							webpackLogger.info(`FieldsJS tranformed ${path.relative(folderFoundIn, JsSrcFullPath)}${folderLog}`);
							
							// Stop Js from Uploading
							this.stopJsUploadToHubspot(compilation, {
								JsDistRelativePath,
								JsonDistRelativePath,
								JsonDistFullPath
							})
							// Remove field.js file from dist directory.
							let JsDistFullPath = path.resolve(distFolder, './' + JsDistRelativePath);
							(fs.existsSync(JsDistFullPath) ? fs.unlinkSync(JsDistFullPath) : null);
	
							// remove fields.js from cache so it will reupload on future watch saves
							clearFileFromCache(JsSrcFullPath)
						}


					} catch (e) {
						clearFileFromCache(JsSrcFullPath);
						webpackLogger.error("Could not transform: " + JsSrcFullPath + "\nError: " + (e.message || ''));
						console.error(e.stack || '')
						//throw e.ReferenceError
					}
				})

				isFirstCompile = false
				resolve();
			});

		});
	}
}

module.exports = FieldsPlugin;