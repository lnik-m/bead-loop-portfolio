import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import metaSeoPlugin from 'jiaguozhen-vite-plugin-meta-inject'

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    metaSeoPlugin({
      configFile: 'meta.config.ts',
      entryPathname: '/editor'
    })
  ],
  resolve: {
    tsconfigPaths: true
  }
})
