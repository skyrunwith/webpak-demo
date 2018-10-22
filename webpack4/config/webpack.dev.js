const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
var website ={
    publicPath:"http://localhost:8888/"
}
module.exports = {
    mode:'development',
    //入口文件配置项
    entry:{
        //main可以随便写
        main:'./src/main.js',
        main2:'./src/main2.js'
    },
    //出口文件配置项
    output:{
        //打包的路径
        path:path.resolve(__dirname,'../dist'),
        //打包文件名称
        filename:'[name].js',
        publicPath:website.publicPath  //publicPath：主要作用就是处理静态文件路径的。
    },
    //模块：例如解读css，如何图片转换，压缩
    module:{
        rules:[
            //css loader
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                // use:[
                //     {loader:'style-loader'},
                //     {loader:'css-loader'}
                // ]
            },
            //图片 loader
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath:'images/',  //打包后的图片放到images文件夹下
                    }
                }]
            }
        ]
    },
    //插件，用于生产模板和各项功能
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。

        }),
        new extractTextPlugin("css/index.css")
    ],
    //配置webpack开发服务功能
    devServer:{
        // 基本目录结构
        contentBase:path.resolve(__dirname, '../dist'),
        compress:true,
        host:'localhost',
        port:8888
    }
}