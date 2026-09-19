import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { Route } from '../+types/root'

export function meta({}: Route.MetaArgs) {
  const title = 'Bead Loop – Create & Edit Beading Patterns Online'
  const description =
    'Bead Loop is a free platform for creating and editing beading patterns. Design, preview, and export beadwork patterns with an intuitive editor built for makers.'
  const url = 'https://bead-loop.netlify.app/'
  const image = 'https://bead-loop.netlify.app/preview.png'

  return [
    { title },
    { name: 'description', content: description },

    { tagName: 'link', rel: 'canonical', href: url },

    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Bead Loop pattern editor preview' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: 'Bead Loop pattern editor preview' }
  ]
}

export const prerender = true

export default function Page() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/editor', { replace: true })
  }, [navigate])

  return null
}
