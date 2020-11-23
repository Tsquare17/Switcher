import babel from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'src/XhrContentSwitcher.js',
    output: {
        dir: 'dist',
        format: 'iife',
        name: 'XhrContentSwitcher',
        sourcemap: true,
    },
    plugins: [
        babel({
            babelHelpers: 'bundled',
        }),
        uglify({
            sourcemap: true,
        }),
    ]
};
