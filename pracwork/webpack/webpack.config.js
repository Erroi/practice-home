const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,  //context定义环境上下文
    entry: path.resolve(__dirname, 'app', 'main.js'),      //也可以定义一组数组[]，指会创建多个主入口依赖文件一起注入，并将依赖导向到一个chunk
                //多页面应用
                entry:{
                    page1:'page1.js',
                    page2:'page2.js',
                },
    output: {
        path: path.resolve(__dirname, "build"),   //不精确到js，是因为HTML输出的时候不会放到js文件下
        filename: "js/app-[chunkhash].js",
                filename:'[name]-[hash].js'  //对于多页面入口，name就是对应的page1.page2每个chunk的名字;hash是每次打包出的版本hash值，chunkhash是每次打包每个chunk对应的hash值(每个文件都不同，每次改变文件内容，chuckhash才会变)
        // pablicPath: "http://47.95.22.64:8888/caizhanbaoMS/"  //上线需要用到的基本路径，
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/, 
            include: path.resolve(__dirname,'app'),             //提升打包速度2 include + exclude
            exclude: path.resolve(__dirname,'node_modules'),   //提升打包速度1  path.resolve(__dirname,)
            loader: "babel-loader"
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname,'app'),            
            exclude: path.resolve(__dirname,'node_modules'),
            loader: "style-loader!css-loader?importLoaders=1!postcss-loader"  //style 引入至HTML的style中  css引入.css文件
                                                                                //import-loaders 解决@import语法的问题，至以一个style标签且经过post处理的样式展示
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname,'app'),            
            exclude: path.resolve(__dirname,'node_modules'),
            loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            exclude: path.resolve(__dirname,'node_modules'),
            loader: 'file-loader',    //在模板中引入相对路径图片 <img src="${ require('../../xxx.png')}"
            query:{
                limit:5000,   //HTTP请求可以缓存，base64小于值会嵌入dom中
                name:'assets/[name]-[hash:5].[ext]'  //指定路径 assets目录下 hash的5位  ext自己的后缀名
            },
            //另一种方式
            loader:[  //file-loader与url-loader一样
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
    postcss:[
        require('autoprefixer')({
            browsers:['last 5 versions']
        })
    ],
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
            title:'this is selfnamed',  //支持ejs语法在魔板文件中引用自定义title，<title><%= htmlWebpackPlugin.options.title %></title>
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            chunks:['main','index']
        }),
        //多页面指定不同模板login.html
        new HtmlWebpackPlugin({ 
            filename: `./login-[hash].html`,
            template: `./app/pages/login.html`,
            inject: true,
            // hash: true, 
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            chunks:['main','login'],  // 当同一个模板需要生成相对应于入口文件的匹配.html时，可指定chunks只引入相应的js-chunks文件
            excludeChunks:['a','c'],  //与chunk相反，有哪些不包括的js文件
        })
    ],

    //测试环境
    devtool:'eval-source-map',           //配置生成source Maos,已于调试
	devServer:{
		contentBase:'./public',          //本地服务器所加载的页面所在的目录
		colors:true,                     //终端中输出的结果为彩色
		historyApiFallback:true,         //不跳转，所有跳转都指向index.html;配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
		inline:true                      //时时刷新
	},
};


// "start": "webpack-dev-server --config webpack.config.dev.js --mode development",
// "build": "webpack --config webpack.config.pro.js --mode production --progress --colors"
  
const path = require("path");
let webpack =require("webpack");

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, "src");
const DIST_PATH = path.resolve(__dirname, "dist");
const STATIC = path.resolve(SRC_PATH,"static");

module.exports = {
    entry:{
        main:path.join(SRC_PATH,"index.js"),
        vendor:[
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "lodash",
            "immutable",
            "graphql.js",
        ]
    },
    output: {
        path:path.join(DIST_PATH),
        filename: "[name].[chunkhash].js",
        // publicPath: './',
        // chunkFilename: '[name].[chunkhash].chunk.js',
    },
    module: {
        rules: [{
            test: /\.js|jsx|ts$/,
            exclude: /node_modules/,
            use: "babel-loader",
        }, {
            test: /\.css$/,
            // exclude: /node_modules/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10480,
                    name:'img/[name]-[hash:6].[ext]'
                }
            }]
        }, {
            test:[/\.less/],
            use:[
                {loader:`less-loader`}
            ]
        },{
            test: /\.scss$/,
            // exclude: /node_modules/,
            // use:ExtractTextPlugin.extract({
                use:[{
                    loader:'style-loader',
                },{
                    loader:"css-loader",
                    options:{
                        importLoaders: 1,
                        modules:true
                    }
                },{
                    loader: 'postcss-loader',
                }],
                // publicPath:path.join(site,"resources")
            // })
        }]
    },
    resolve:{
        extensions: ['.js','.jsx',".ts",".tsx"],
        alias:{
            com:path.resolve(SRC_PATH,"components"),
            utils:path.join(STATIC,"utils"),
            config:path.join(SRC_PATH,"config"),
            static:STATIC,
        }
    },
    plugins: [
        // new ExtractTextPlugin({
        //     filename: "style.css",
        //     disable: false,
        //     allChunks: true
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            filename:"index.html",
            title:"项目管理平台",
            template:path.join(SRC_PATH,"index.html"),
            hash:false,
            inject:true,
        }),
        // new webpack.DefinePlugin(Object.assign({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        // })),
    ],
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 minChunks: 2, maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     },
    //     runtimeChunk: true
    // }
    externals: {
        react: 'React',
        jquery: 'jQuery'
    }
    // externals: 如果我们想引用一个库，但是又不想让webpack打包，而且可以在程序中以CMD、AMD、或者Windows/global全局等方式进行引用
    // 就可以通过配置externals
    // 假设：我们开发了一个自己的库，里面引用了lodash这个包，经过webpack打包的时候，发现如果把这个lodash包打入进去，打包文件就会非常大。那么我们就可以externals的方式引入。也就是说，自己的库本身不打包这个lodash，需要用户环境提供
};
