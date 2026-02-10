import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/Project_Dmotion_Demar/',
    plugins: [
        tailwindcss(),
    ],
})
