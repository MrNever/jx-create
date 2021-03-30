/*
 * @Author       : qxhu
 * @Date         : 2021-03-24 16:38:54
 * @LastEditors  : qxhu
 * @LastEditTime : 2021-03-30 09:59:21
 * @Description  : 配置
 */

const webpack = require('webpack');
const CracoVtkPlugin = require("craco-vtk");
const CompressionWebpackPlugin = require('compression-webpack-plugin');//打包build生成gizp压缩文件
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');//打包忽略console,debugger
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );//查看打包的进度
const path = require('path');

module.exports = {
    webpack: {
            alias: {
                "@": path.resolve("src"),
            },
            plugins: [
                // 打压缩包
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' +
                        ['js', 'css'].join('|') +
                        ')$'
                    ),
                    threshold: 1024,
                    minRatio: 0.8
                }),
                //打包忽略console,debugger
                // new UglifyJsPlugin({
                //     uglifyOptions: {
                //         compress: {
                //             warnings: false,
                //             drop_debugger: true,
                //             drop_console: true,
                //         },
                //     },
                //     sourceMap: false,
                //     parallel: true,
                // }),
                new SimpleProgressWebpackPlugin(),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    },
    plugins: [
        {
            plugin: CracoVtkPlugin()
        }
    ],
    devServer:{
        port:1919,
        hot:true
    }
}