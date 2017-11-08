//import json from 'rollup-plugin-json';
import riot from 'rollup-plugin-riot';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';
import {
    minify
} from 'uglify-js';

export default {
    input: 'src/js/main.js',
    output: {
        file: 'src/js/main.min.js',
        format: 'iife'
    },
    globals: {
        riot: 'riot'
    },
    external: [
        'riot'
    ],
    plugins: [
        riot({
            ext: 'html'
        }),
        eslint({
            exclude: [
                'src/styles/!**'
            ]
        }),
        uglify({}, minify)
    ]
};
