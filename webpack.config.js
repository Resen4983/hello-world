const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const config = {
    mode: 'production', // 打包环境
    entry: path.join(__dirname, 'src/index.js'), //入口文件
    output:{
        // publicPath: path.join(__dirname, 'dist/'),
        path: path.join(__dirname, 'dist'), // 打包输出目录
        filename: '[name].[hash:8].js' // 输出文件名称,原有的名称+min.js
    },
    resolve:{
        alias:{
            '@':path.join(__dirname,'src')
        },
        extensions:['*','.js','.vue','json']
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader' // 处理vue单文件模式组件内容
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader' // 处理jsx文件内容
            },
            //babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
            //需要借助babel-polyfill来帮助我们转换
            // {
            //     test: /\.js$/,
            //     exclude:/node_modules/,
            //     use:{
            //         loader:'babel-loader',
            //         options:{
            //             presets:['babel-preset-env']
            //         }
            //     }
            // },
            // {
            //     test: /\.css$/,
            //     use:[
            //         'style-loader', // 将样式作为内联的方式写到文件内
            //         'css-loader' // 抽取<style>标签里css样式
            //     ]
            // },

            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            name: '[name]-[hash:8].[ext]',// ext为拓展名
                            limit: 1024, // 小于1024Bytes的图片处理成base64编码
                            fallback:{
                                loader:'file-loader'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        // DefinePlugin从来定义一个变量可以给到js文件去使用,webpack4里面已经改成可以通过mode字段来指定,告诉webpack打包结果是应用在什么环境下
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: isDev ? '"development"' : '"production"'
        //     }
        // }),
        new CleanWebpackPlugin(), // 每次打包前清除output目录下的内容
        new VueLoaderPlugin(),//vue-loader，15的版本需要再添加plugin的配,14版本的不需要
        new HtmlWebpackPlugin({
            favicon: './fav.ico'
        })
    ]
}
if(isDev) {
    config.module.rules.push(
        {
            test: /\.styl/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap: true // 直接用stylus传递过来的sourceMap就行了,不需要自己再重复生成map
                    }
                },
                'stylus-loader' // 读取stylus样式文件内容处理成css标准的css内容给css-loader
            ]
    });
    config.mode='development';
    config.devtool = 'cheap-module-eval-source-map'; // 选择一种souce-map来方便调试https://www.webpackjs.com/configuration/devtool/,https://juejin.im/post/58293502a0bb9f005767ba2f
    config.devServer = {
        host: '0.0.0.0',
        port:8090,
        hot: true,
        // open: true,
        overlay:{errors: true} // 打包错误显示在页面上
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin() // 热更新时只跟新局部,不刷新页面
    )
}else{
    config.entry = {
        app: path.join(__dirname, 'src/index.js'), //入口文件
        // vendor:['vue'] // 将入口文件拆分,配合plugin类库文件单独打包
    }
    // 提取类库文件到单独文件https://juejin.im/post/5b99b9cd6fb9a05cff32007a
    config.optimization={
        splitChunks:{
            chunks: 'all',
            cacheGroups:{
                vendors:{
                    test: /vue/,
                    name:"vendors"
                }
            }
        }
    }
    config.module.rules.push(
        {
            test: /\.styl/,
            use:[
                {
                    loader:MiniCssExtractPlugin.loader, // 这个插件loader可以将css内容提取到一个单独的css文件中
                    options:{

                    }
                },
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap: true // 直接用stylus传递过来的sourceMap就行了,不需要自己再重复生成map
                    }
                },
                'stylus-loader' // 读取stylus样式文件内容处理成css标准的css内容给css-loader
            ]
        }
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename:'[name].[contentHash:8].css',
            chunkFilename:'[id].css'
        })
    );
    
}
module.exports = config;