import type { MetaSeoConfig } from 'jiaguozhen-vite-plugin-meta-inject'

const title = 'Bead Loop'
const description = 'Platform for creating and editing beading patterns'
const image = 'https://bead-loop.netlify.app/preview.png'

const config: MetaSeoConfig = {
  fallback: {
    title: 'Bead Loop',
    meta: {
      description: 'Platform for creating and editing beading patterns',
    }
  },
  routes: [
    {
      path: '/editor',
      title,
      meta: {
        description,

        'og:title': title,
        'og:description': description,
        'og:type': 'website',
        'og:image': image,
        'og:image:alt': 'Editor preview',

        'twitter:card': 'summary_large_image',
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': image,
      }
    }
  ]
}

export default config
