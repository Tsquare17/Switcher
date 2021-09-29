import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/Switcher.js',
    output: {
        dir: 'dist',
        format: 'iife',
        name: 'Switcher',
        sourcemap: true,
    },
    plugins: [
        babel({
            babelHelpers: 'bundled',
        }),
        terser(),
    ]
};
