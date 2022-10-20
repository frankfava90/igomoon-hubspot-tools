# Laravel Mix HubSpot Extension <!-- omit in toc -->

![1.1.0](https://img.shields.io/badge/Version-1.1.0-brightgreen)

This is a Laravel Mix Extension for HubSpot Local Development

```javascript
let mix = require('laravel-mix');
(require('@igomoon/hubspot-laravel-mix')(mix))
```


## Usage 
1. Setup `package.json` and `webpack.mix.js` using the examples below.
2. Run `npm install`
3. Run `npm run local` so Laravel Mix will install the dependencies need according to your mix config file.
	- **IMPORTANT**: Due to an error within the current version of the [`@hubspot/webpack-cms-plugins`](https://www.npmjs.com/package/@hubspot/webpack-cms-plugins) package, it is unable to be installed by Laravel Mix automatically. It should be included in your starting `package.json` file or by running `npm install @hubspot/webpack-cms-plugins --save-dev`.
4. Run `hs init` to use [`@hubspot/cli`](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli) to authenticate with your HubSpot portal
5. Run mix command (or use the included npm scripts in our example package.json) to begin
	- `npx mix` - Build in "development" mode
	- `npx mix watch` - Build in "development" mode, and watch for changes (no uploade)
	- `npx mix  -- --env hsAutoUpload=true` - Build once in "development" mode (will upload to HubSpot)
	- `npx mix watch  -- --env hsAutoUpload=true` - Build in "development" mode, and watch for changes (will upload to HubSpot)
	- `npx mix  -- --env hsAutoUpload=true --env production` - Build once in "production" mode (will upload to HubSpot)

### Option: "hsSilent=true"
You can use "hsSilent" to mute the HubSpot Logger Information

```bash
mix watch -- --env hsAutoUpload=true "hsSilent=true"
```

### [Example package.json](examples/package.json)
```json
{
	"scripts": {
		"local": "mix",
        "watch": "mix watch -- --env hsAutoUpload=true",
        "build": "mix -- --env hsAutoUpload=true",
        "deploy": "mix -- --env hsAutoUpload=true --env production"
	},
	"devDependencies": {
		"@hubspot/webpack-cms-plugins": "^3.0.9",
		"@igomoon/hubspot-laravel-mix": "^1.0.0",
		"laravel-mix": "^6.0.39"
	}
}
```

### [Example webpack.mix.js](examples/webpack.mix.js)

```javascript
let mix = require('laravel-mix');
(require('@igomoon/hubspot-laravel-mix')(mix))

mix.js(`src/resources/js/main.js`, `assets/js/main.js`);
mix.sass(`src/resources/scss/main.dev.scss`, `assets/css/main.css`);

mix.hubspot({
	label: 'My Theme',
	upload: {
		outputFolder: 'dist',
		dest: 'theme-folder',
		patterns: [
			{ from: 'src/hubl', to: 'hubl' },
			{ from: 'src/theme.json', to: 'theme.json' },
			{ from: 'src/resources/images', to: 'assets/images' },
			{ from: 'src/resources/icons', to: 'assets/icons' }
		]
	},
	fieldsJs: {
		src : "./src", // Can be array
		extraDirsToWatch: ["./src/fields"]
	}
})

mix.options({
	manifest: false, // Disable manifest generation.
	processCssUrls: false, 	// Don't perform any css url rewriting by default
	autoprefixer: { remove: true } // Remove Outdated prefixes
})
```

This extensions uses:
- [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
- [@hubspot/webpack-cms-plugins](https://www.npmjs.com/package/@hubspot/webpack-cms-plugins)
- [@igomoon/hubspot-fields-js](https://www.npmjs.com/package/@igomoon/hubspot-fields-js)