import {defineConfig} from 'tsup';

/** @typedef {import('tsup').Options} Options */
/** @typedef {ReturnType<typeof defineConfig>} TSUPDef */

/**
 * Create tsup config
 * @param {Options} opts TSUP Options
 * @return {TSUPDef}
 */
export const defineTsup = (opts) =>
    defineConfig({
        target: ['node14', 'node16'],
        dts: true,
        minify: true,
        bundle: true,
        clean: true,
        outDir: './dist',
        minifyIdentifiers: true,
        minifySyntax: true,
        platform: 'node',
        tsconfig: './tsconfig.json',
        format: 'esm',
        ...opts,
    });
