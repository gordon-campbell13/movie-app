const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './client/'),
        publicPath: '/build/',
        hot: true,
        // port: 8080,
        proxy: {
            '/movie': { 
                target: 'http://localhost:3000'
            }
        }
    },
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/env", "@babel/react"] }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}