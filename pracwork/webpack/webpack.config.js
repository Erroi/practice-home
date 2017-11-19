const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context:__dirname,  //context定义环境上下文
    entry: path.resolve(__dirname, 'app', 'main.js'),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/app-[chunkhash].js",
        // pablicPath: "http://47.95.22.64:8888/caizhanbaoMS/"  //上线需要用到的基本路径，
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname,'app'),
            exclude: path.resolve(__dirname,'node_modules'),
            loader: "babel-loader"
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname,'app'),            
            exclude: path.resolve(__dirname,'node_modules'),
            loader: "style-loader!css-loader?import-loaders=1!postcss-loader"
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname,'app'),            
            exclude: path.resolve(__dirname,'node_modules'),
            loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            exclude: path.resolve(__dirname,'node_modules'),
            loader: 'file-loader!url-loader',    //在模板中引入相对路径图片 <img src="${ require('../../xxx.png')}"
            query:{
                limit:5000,   //HTTP请求可以缓存，base64小于值会嵌入dom中
                name:'assets/[name]-[hash:5].[ext]'  //指定路径 assets目录下 hash的5位  ext自己的后缀名
            },
            //另一种方式
            loader:[
                'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]',
                'image-webpack'  //对图片进行压缩
            ]
        },{
            test: /\.html$/,
            loader:'html-loader',
        },{
            test:/\.ejs$/,
            loader:'ejs-loader',
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new CleanWebpackPlugin(['./build/js']),
        new HtmlWebpackPlugin({
            filename: `./index.html`, //生成的html存放路径，相对于 path
            template: `./app/pages/index.html`,
            inject: true, //允许插件修改哪些内容，包括head与body false
            // hash: true, //为静态资源生成hash值,不需要在文件末尾加？hash值了
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        //多页面指定不同模板login.html
        new HtmlWebpackPlugin({ 
            filename: `./login.html`,
            template: `./app/pages/login.html`,
            inject: true,
            // hash: true, 
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    ],
};
