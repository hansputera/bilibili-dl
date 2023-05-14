// uno.config.ts
import {defineConfig, presetUno} from 'unocss';

export default defineConfig({
    presets: [presetUno()],
    shortcuts: {
        btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    },
});
