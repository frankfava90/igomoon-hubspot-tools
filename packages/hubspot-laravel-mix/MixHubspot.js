const path = require('path');
class MixHubspot {

	registeredOptions = {}
	pluginOptions = {}
	pluginsToLoad = []

	name() { return ['hubspot']; }
	
	dependencies() {
		// NOTE: @hubspot/webpack-cms-plugins will not resolve due to a missing "main" definition in its package json
		return [
			'copy-webpack-plugin@^8.1.1',
			// '@hubspot/webpack-cms-plugins@^3.0.9',
			'@igomoon/hubspot-fields-js@^1.3.0'
		];
	}
	
	register(options = {}) {
		// Backwards compatibility with old uppercase-first keys
		Object.keys(this.options.interface).forEach(key => {
			let oldKey = key.charAt(0).toUpperCase() + key.slice(1)
			if ((options[oldKey] !== undefined)) {
				options[key] = options[oldKey]
				delete options[oldKey]
			}
		})

		// Parse Options
		this.registeredOptions = Object.assign({}, this.options.interface, options)
		// Register Plugins
		this.registerPluginsToLoad()
	}

	boot() {
		// Add help text to help resolve the HubSpot package error
		try {
			require(this.context.resolve('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin'));
		} catch(e){
			throw "Due to an error within the current version of the `@hubspot/webpack-cms-plugins` package, it is unable to be installed by Laravel Mix automatically. If it was not completed on your initial npm installation then you should run `npm install @hubspot/webpack-cms-plugins --save-dev` and then run Mix again."
			process.exit()
		}
	}

	webpackConfig(webpackConfig) {
		const webpack = require(this.context.resolve('webpack'));
		webpackConfig.plugins = [new webpack.DefinePlugin({
			IS_DEV: JSON.stringify(!(process.argv.includes('production')) && process.env.NODE_ENV != 'production')
		})]
		this.loadPlugins(webpackConfig)
	}

	options = {
		interface: {
			label: '',
			upload: {},
			fieldsJs: false,
			notifications: {},
			disableMixTable: true
		},
		parseOptionFor: (key, defaults = null) => {
			if (!key || this.options.interface[key] == undefined) {
				return null;
			}
			let registeredOptions = this.registeredOptions[key]
			if (registeredOptions === false) { return false }
			// Options
			return (typeof registeredOptions == 'object') ?
				Object.assign({}, defaults, registeredOptions) :
				registeredOptions
		}
	}
	
	get isAutoUpload() {
		return process.argv.some(arg =>
			arg.includes('hsAutoUpload=true')
		);
	}

	get isHsSilent() {
		return process.argv.some(arg =>
			arg.includes('hsSilent=true')
		);
	}

	get context() {
		return global.Mix;
	}

	// --------------------------------

	// Maps options from all plugins
	getPluginOptions() { 
		let options = {}
		Object.entries(this.plugins).forEach(p => { 
			let [key, callback] = p
			options[key] = callback().options
		})
		this.pluginOptions = options
		return this.pluginOptions
	}

	// Determine which plugins to use
	registerPluginsToLoad() {
		// Load All Options
		this.getPluginOptions()
		// Register Plugins
		this.pluginsToLoad =  Object.entries(this.plugins).map(p => { 
			let [key, callback] = p
			let plugin = callback.call(this)
			// Callback
			if (typeof plugin.beforeRegistered == 'function') { plugin.beforeRegistered.call(this) }
			// Filter out if false
			if (plugin === false || this.pluginOptions[key] === false) { return false }
			// Callback
			if (typeof plugin.whenRegistered == 'function') { plugin.whenRegistered.call(this) }
			// Save callback and options
			return { load: plugin.load, options: this.pluginOptions[key] }
		}).filter(p => !!p)
	}

	// Load Registered Plugins
	loadPlugins(webpackConfig) {
		this.pluginsToLoad.forEach(plugin => { 
			let p = plugin.load({ webpackConfig, options : plugin.options})
			if(typeof p == 'object') {
				webpackConfig.plugins = webpackConfig.plugins.concat((Array.isArray(p) ? p : [p]))
			}
		})
	}

	plugins = {
		upload: () => ({
			options: this.options.parseOptionFor('upload', {
				outputFolder: 'dist',
				patterns: [],
				dest: ""
			}),
			load: ({ webpackConfig, options }) => {
				let plugins = []
				
				// Coppy Plugins
				if (!Array.isArray(options.patterns) || !options.patterns.length) { return false }
				const CopyWebpackPlugin = require(this.context.resolve('copy-webpack-plugin'));
				plugins = [new CopyWebpackPlugin({ patterns: options.patterns })]
				
				// Auto Upload
				if (!!options.outputFolder) {
					// Change Dist Folder
					webpackConfig.output.path = path.resolve(this.context.paths.rootPath, options.outputFolder)
					
					if (!!options.dest) {
						// Change Logger Interface level
						if (this.isAutoUpload && !this.isHsSilent) {
							webpackConfig.infrastructureLogging = { level: 'info' }
						}
					
						// Suetp HS Upload Plugin
						const HubSpotAutoUploadPlugin = require(this.context.resolve('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin'));
					
						plugins = plugins.concat([
							// Upload
							new HubSpotAutoUploadPlugin({
								autoupload: this.isAutoUpload,
								src: webpackConfig.output.path,
								dest: options.dest,
							})
						])
					}
				}
				return plugins
			}
		}),
		fieldsJs: () => ({
			options: this.options.parseOptionFor('fieldsJs', false),
			load: ({ webpackConfig, options }) => {
				webpackConfig.infrastructureLogging = { level: 'info' }	
				const { FieldsPlugin } = require(this.context.resolve('@igomoon/hubspot-fields-js'));
				return [new FieldsPlugin(options)]
			}
		}),
		notifications: () => ({
			options : this.options.parseOptionFor('notifications',{
				title: this.pluginOptions.label || "Dist Folder",
				showOnSuccess : true,
				showWarnings : true,
				showOnError: true, 
				emoji: false,
				skipFirst: false,
				icon : true
			}),
			beforeRegistered: () => { this.context.config.notifications = false; },
			load: ({ options }) => {
				const WebpackNotifierPlugin = require(this.context.resolve('webpack-notifier'));
				return new WebpackNotifierPlugin({	
					title: options.title,
					excludeWarnings: !options.showWarnings,
					alwaysNotify: !!options.showOnSuccess,
					onlyOnError: !options.showOnSuccess || (!options.showWarnings && !!options.showOnError), 
					emoji: !!options.emoji,
					skipFirstNotification : !!options.skipFirst,
					timeout: false,
					hint: process.platform === 'linux' ? 'int:transient:1' : undefined,
					contentImage : !!options.icon ? this.context.paths.root('node_modules/@igomoon/hubspot-laravel-mix/icons/hubspot.png') : null
				})
			}
		}),
		disableMixTable: () => ({
			options: this.options.parseOptionFor('disableMixTable'),
			load: ({ webpackConfig }) => {
				let BuildOutputPlugin = require(this.context.resolve('laravel-mix/src/webpackPlugins/BuildOutputPlugin'));
				webpackConfig.plugins = webpackConfig.plugins.filter(p => !(p instanceof BuildOutputPlugin))
			}
		}),
	}

}

module.exports = MixHubspot