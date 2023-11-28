import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    base: "/point-de-rencontre/",
    resolve: {
        alias: {
            $lib: path.resolve('./src/lib'),
            $assets: path.resolve('./assets'),
        }
    }
})
