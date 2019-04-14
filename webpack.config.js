const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [ './www/src/klerde.ts', './www/styles/klerde.scss' ],
	mode: 'development',
    devtool: 'inline-source-map',
    watchOptions: {
        ignored: /node_modules/
    },
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.scss$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: 'url-loader'
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	output: {
		filename: 'klerde.js',
		path: path.resolve(__dirname, 'www/dist')
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'klerde.css'
		})
	]
};
