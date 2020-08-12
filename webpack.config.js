const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin')

var isProduction = (process.env.NODE_ENV==="production");

module.exports={
    //базовый пусть к проекту
    context: path.resolve(__dirname, 'src'),



    //точки входа

    entry: {
        // основной файл приложения
        app: [
            './js/app.js',
            './scss/style.scss'
        ]
    },

    // место выгрузки собранных файлов

    output:{
        filename: 'js/[name].js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '../'
    },
    devtool:(isProduction) ? '': 'inline-source-map',
    module:{
        rules: [
            // SCSS
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        },
                    ],
                    fallback: 'style-loader',
                })
            },
            //img
            {
                test: /\.(png|jpg|svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ]
            },
            //fonts
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use:{
                    loader: 'file-loader',
                    options:{
                        name: '[path][name].[ext]'
                    }
                }
            },
            //svg
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('/css/[name].css'),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'dist/img'),
              globOptions: {
                ignore: [
                    path.resolve(__dirname, 'src/img/dsds')
                ]
            } },
            ],
          }),
    ]
}

// production only 
if(isProduction){
    module.exports.plugins.push(new UglifyjsWebpackPlugin({sourceMap: true}))
    module.exports.plugins.push(new ImageminWebpackPlugin({test: /\.(png|jpg|svg|gif)$/i}))
    module.exports.plugins.push(new webpack.LoaderOptionsPlugin({minimize:true}))
}

