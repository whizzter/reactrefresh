const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
	entry: "./src/todomain.tsx",
	output: {
		filename: "./bundle.js"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".webpack.js",".web.js",".tsx",".ts",".js",".json"]
	},

	module: {
		rules: [
			{test: /\.tsx?$/,loader:"ts-loader"},
			// {test: /\.tsx?$/,loader:"awesome-typescript-loader"},
			{test: /\.css$/,loader:"style-loader!css-loader"}
		]
//		preLoaders: [
//			{ test:/\.js$/,loader: "source-map-loader" }
//		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title:"Hello world todo!"
		})
	],

	// Use externals and CDN to bring down bundle sizes (but production is more important!!)
	// externals: {
	// 	"react":"React",
	// 	"react-dom":"ReactDOM"
	// }
};

