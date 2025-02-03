"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/script.js",
        result: "./src/js/resultPage/resultPage.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist/js"),
    },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "../index.html",
            chunks: ["main"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/result-page.html",
            filename: "../result-page.html",
            chunks: ["result"],
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
};
