## 基于webpack搭建的vue
### 使用步骤
```
#克隆项目
git clone https://github.com/steven3192/webpack-vue.git
#进入目录
cd webpack-vue
#安装依赖
npm install
#运行
npm run dev
```

### 初始化项目
新建目录，初始化项目
```
npm init
```
在package.json中添加：
```
"devDependencies": {
// babel相关
    "babel-loader": "^8.1.0",
    "@babel/core": "^7.11.6",
    "@babel/plugin-transform-runtime": "^7.11.5",
    "@babel/preset-env": "^7.11.5",
    "@babel/runtime-corejs3": "^7.11.2",
    "core-js": "^3.6.5",
//css兼容
    "postcss-loader": "^4.0.2",
    "autoprefixer": "^9.8.6",
//build时清空旧文件
    "clean-webpack-plugin": "^3.0.0",
//css处理
    "style-loader": "^1.2.1",
    "css-loader": "^4.3.0",
    "optimize-css-assets-webpack-plugin": "^5.0.4",    //压缩css文件
    "cssnano": "^4.1.10",
    "mini-css-extract-plugin": "^0.11.2",  //提取css成单独文件
//sass支持
    "node-sass": "^4.14.1",
    "sass-loader": "^10.0.2",
//处理资源
    "file-loader": "^6.1.0",
    "html-loader": "^1.3.0",
    "url-loader": "^4.1.0",
//生成html
    "html-webpack-plugin": "^4.4.1",
//提供web容器
    "webpack-dev-server": "^3.11.0"
//webpack包
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
  },
  "dependencies": {
    "axios": "^0.20.0",
    "element-ui": "^2.13.2",
    "vue": "^2.6.12",
    "vue-loader": "^15.9.3",
    "vue-template-compiler": "^2.6.12",
    "vue-router": "^3.4.5"
  },
//兼容浏览器
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```
### 安装依赖
```
npm install
```
### 配置babel
在根目录下新建一个.babelrc文件
```
{
    "presets": [
        [
            "@babel/preset-env",  //转译ES6语法
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",  //转译api
            {
                "corejs": 3
            }
        ]
    ]
}
```
### 配置postcss
在根目录新建postcss.config.js文件
```
module.exports = {
    plugins: [
        require('autoprefixer')
    ],
    sourceMap: true
}
```
### 配置开发环境
在根目录新建webpack.dev.js作为开发环境的配置
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './js/index.js'
    },
    resolve : {
        extensions: ['.js', '.vue'],    // 引入时自动添加后缀
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sacc)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,   //8kb   8kb以下的图片会base64处理
                            outputPath: 'images',   //决定文件本地输出路径
                            publicPath: 'images/',  //决定图片的url路径
                            name: '[hash:8].[ext]'  //修改文件名称  [hash:8] hash值取8位    [ext] 文件扩展名
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media',
                    name: '[hash:5].[ext]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory:true

                    }
                }
            }
        ]
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'    //以当前文件为模板创建新的html文件（结构和原先一样，自动引入打包的资源）
        }),
        new VueLoaderPlugin()
    ],
    devServer: {    // 配置自动化编译
        open: true, // 自动打开浏览器
        compress: true, // 启动gzip压缩
        port: 8080, // 端口号
        hot: true,   // 模块热更新
    },
    devtool: 'cheap-module-eval-source-map' // 开发
}
```
### 配置生产环境
在根目录新建webpack.prod.js
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //  解构赋值
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // 提取css成单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');  // 压缩css文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: path.join(__dirname, '../build'),
        filename: './js/build.js',
        publicPath: '/',
    },
    resolve : {
        extensions: ['.js', '.vue'],    // 引入时自动添加后缀
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sacc)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,   //8kb   8kb以下的图片会base64处理
                            outputPath: 'images',   //决定文件本地输出路径
                            publicPath: 'images/',  //决定图片的url路径
                            name: '[hash:8].[ext]'  //修改文件名称  [hash:8] hash值取8位    [ext] 文件扩展名
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media',
                    name: '[hash:5].[ext]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory:true
                    }
                }
            }
        ]
    },
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',   //以当前文件为模板创建新的html文件（结构和原先一样，自动引入打包的资源）
            minify: {
                removeComments: true,   //移出注释
                collapseWhitespace: true,   //折叠所有留白
                removeRedundantAttributes: true,    //移除无用的标签
                useShortDoctype: true,  //使用短的文档声明
                removeEmptyAttributes: true,    //移除空标签
                removeStyleLinkTypeAttributes: true,    //移除rel="stylesheet"
                keepClosingSlash: true, //自结束
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[hash:5].css",
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default',{ discardComments: {removeAll: true}}],
            },
            cssProcessorOptions: {  // 解决没有source map问题
                map: {
                    inline: false,
                    annotation: true
                }
            }
        }),
        new VueLoaderPlugin()
    ],
    devtool: 'cheap-module-source-map' // 开发
}
```
### 配置script命令
```
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```
### 新建public目录，新建public/index.html文件
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
    <title>webpack-vue</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
### 新建src目录
```
//main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import element from 'element-ui'
Vue.use(element)

Vue.config.productionTip = false

new Vue({
    el: "#app",
    router,
    render: h => h(App)
})

// App.vue
<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>
<style lang="scss">

</style>

```
### 运行程序
```
npm run dev
```
### 打包
```
npm run build
```