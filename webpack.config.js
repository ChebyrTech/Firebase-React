"use strict";

module.exports = {
    entry: {
		"build/bundle": "./src/main.jsx"

    } ,
           
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                query:
                {
                       presets: ['es2015', 'react']
                }
            }
        ]
    }
};