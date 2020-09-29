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
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/transform-runtime'],
                        cacheDirectory: true //开启babel缓存
                    }
                }
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