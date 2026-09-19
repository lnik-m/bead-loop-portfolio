import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { Route } from '../+types/root'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Bead Loop' },
    {
      name: 'description',
      content: 'Platform for creating and editing beading patterns'
    },
    { property: 'og:title', content: 'Bead Loop' },
    {
      property: 'og:description',
      content: 'Platform for creating and editing beading patterns'
    },
    {
      property: 'og:image',
      content: 'https://bead-loop.netlify.app/preview.png'
    }
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
