import riot from 'rollup-plugin-riot';
import uglify from 'rollup-plugin-uglify';
import {
    minify
} from 'uglify-js';

export default {
    input: 'src/js/main.js',
    output: {
        file: 'src/js/main.min.js',
        format: 'iife',
        globals: {
            "riot": "riot"
        }
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
        uglify({}, minify)
    ]
};
