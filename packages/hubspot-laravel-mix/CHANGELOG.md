# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2022-10-13
- Refactor
- options changes to use lowercase
- Use Laravel Mix `webpack-notifier` instead of additional dependency `webpack-build-notifier`
- Add in IS_DEV Variable using Define Plugin so `-- --env production` flag can be used for building production
- Remove HS-MIX-FIX anonymous plugin as it's fix in latest version of Fields JS

## [1.0.4] - 2022-04-08
- Fix Readme Version Badge
## [1.0.3] - 2022-04-08
- Make sure infrastucture shows FieldsJs information
## [1.0.2] - 2022-03-29
- Add Fixed path files to emittedAssets as they weren't triggering emits

## [1.0.1] - 2022-01-18
- Add in console message for `@hubspot/webpack-cms-plugins` reoslution issue
	- NOTE: @hubspot/webpack-cms-plugins will not resolve due to an missing "main" definition in its package json
- Updates example package.json to include `@hubspot/webpack-cms-plugins` on initial install
- Updated [readme.md](readme.md) file.

## [1.0.0] - 2022-01-11
- Initial Publish
