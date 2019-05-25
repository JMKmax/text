const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
//css单独打包成一个文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";

const getHtmlConfig = (name,title)=>({
	template:'./src/view/'+name+'.html',//模板文件
    filename:name+'.html',//输出的文件名
    title:title,//
    inject:true,//脚本写在那个标签里,默认是true(在body结束后)
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks:['common',name]
})

module.exports = {
	//指定打包环境
	mode:'development',
	// mode:'production',
	//指定入口
	//单入口写法一
	entry:{
		//chunk名称:文件路径
		'common':'./src/page/common/index.js',
		'index':'./src/page/index/index.js',
		'user-login':'./src/page/user-login/index.js',
		'user-center':'./src/page/user-center/index.js',
		'user-update-password':'./src/page/user-update-password/index.js',
		'user-register':'./src/page/user-register/index.js',
		'list':'./src/page/list/index.js',
		'detail':'./src/page/detail/index.js',
		'result':'./src/page/result/index.js',
	},
	//单入口写法二
	//entry: './src/index.js',
	//指定出口
	output: {
		//出口文件名称
		filename: 'js/[name].[hash].bundle.js',
		//输出路径
		publicPath:publicPath,
		//出口的文件所在的目录
		path: path.resolve(__dirname, 'dist')
	},
	//配置别名
	resolve:{
		alias:{
			page:path.resolve(__dirname,'./src/page'),
			util:path.resolve(__dirname,'./src/util'),
			service:path.resolve(__dirname,'./src/service'),
			common:path.resolve(__dirname,'./src/common'),
			images:path.resolve(__dirname,'./src/images'),
			node_modules:path.resolve(__dirname,'./node_modules'),
		}
	},
	module: {
		rules: [
		//处理css文件
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						}
					},
					"css-loader"
				]
			},
	    //处理图片 
			{
				test: /\.(png|jpg|gif|jpeg|ttf|woff2|woff|eot|svg)\??.*$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			      			limit: 100,
			      			name:'images/[name].[ext]'
			    		}
			  		}
				]
			},
		//babel	
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            presets: ['env','es2015','stage-3'],
			        }
			    }               
			},
			{
			    test:/\.tpl$/,
			    use: {
			        loader: 'html-loader'
			    }               
			}									
		]
	},
	plugins:[
	    new htmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new htmlWebpackPlugin(getHtmlConfig('user-login','用户登陆')),
	    new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
	    new htmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),
	    new htmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
	    new htmlWebpackPlugin(getHtmlConfig('list','商品列表')),
	    new htmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
	    new htmlWebpackPlugin(getHtmlConfig('result','结果页面')),
	    new CleanWebpackPlugin(),
	    new MiniCssExtractPlugin({
	    	filename:'css/[name].css'
	    })
	],
	devServer:{
		contentBase: './dist',//内容的目录
		port:3002,//服务运行的端口
		proxy: [{
			context: ['/user','/product'],
			target: 'http://localhost:3000',
	    }]
	}			
};