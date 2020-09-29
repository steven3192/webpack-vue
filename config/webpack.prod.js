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