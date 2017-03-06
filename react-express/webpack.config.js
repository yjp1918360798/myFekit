var webpack = require('webpack');
var path = require('path');
var ET = require('extract-text-webpack-plugin');

var publicPath = 'http://localhost:3030/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
	
	//入口   配置
	entry: {
		app: [__dirname+ '/client/enter/app.jsx' , hotMiddlewareScript],
		list: [__dirname+ '/client/enter/list.jsx' , hotMiddlewareScript]
	},

	
	//出口 输出配置
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: './js/[name].js',
		publicPath: publicPath
	},
	
	// sourcemap
	devtool: 'source-map',
	
	//模块配置
	module:{
		loaders:[{
			test: /\.scss$/,
//			loader: 'style!css!sass'  		//style!css不能交换位置
			loader: ET.extract('style','css!sass')
		},{
			test: /\.css$/,
			loader: 'style!css'  		//style!css不能交换位置
		},{
			test:/\.js$/,
			exclude: /node_modues/,
			loader: 'babel'
		},{
			test:/\.jsx$/,
			exclude: /node_modues/,
			loader: 'babel'
		},{
			test:/\.html/,
			loader:'string'
		}]
	},
	
	
	//插件
	plugins: [
		//版本号控制需要的
		 new ET("./css/[name].css" ),
		 new webpack.HotModuleReplacementPlugin(),
		 new webpack.optimize.OccurenceOrderPlugin(),
		 new webpack.NoErrorsPlugin()
	]
}