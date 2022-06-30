import {defineBuildConfig} from 'unbuild';

export default defineBuildConfig({
    'declaration': true,
    'clean': true,
    'dependencies': ['@bilibili-dl/config', '@bilibili-dl/util', '@bilibili-dl/core'],
    'entries': ['src/'],
    'outDir': 'dist',
});
