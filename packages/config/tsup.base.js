import {defineConfig} from 'tsup';

/** @typedef {import('tsup').Options} Options */

/**
 *
 * @param {Options} opts TSUP Options
 * @return {ReturnType<typeof defineConfig>}
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
