import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

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
        terser(),
    ]
};
