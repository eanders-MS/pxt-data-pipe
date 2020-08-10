const {
	override,
	addWebpackResolve,
	setWebpackPublicPath
} = require("customize-cra");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

function addCspHtmlWebpackPlugin(config) {
	if (process.env.NODE_ENV === 'production') {
		config.plugins.push(new cspHtmlWebpackPlugin(
			{
				'script-src': ["'self'", "'unsafe-eval'"],
			}, {
			enabled: true,
			hashEnabled: true,
			nonceEnabled: false
		}));
	}
	return config;
}

module.exports = {
	webpack: override(
		// Change how symlinks are resolved in CRA. Required because the webpack projects share a common code lib via symlink.
		// NOT WORKING FOR SOME REASON. See README.md in root folder for workaround.
		addWebpackResolve({
			symlinks: false
		}),
		setWebpackPublicPath('/popup'),
		addCspHtmlWebpackPlugin
	)
}
