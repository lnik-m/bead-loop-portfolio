import { NotFoundSvg } from 'shared/assets'

import { useState, useEffect } from 'react'
import type { Theme } from 'shared/types'
import { Flex } from 'shared/ui'

interface Props {
  theme: Theme
}

export const NotFound = ({ theme }: Props) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <Flex
      className={`"${
        theme === 'dark' ? 'bg-support-700' : 'bg-accent-200'
      }" justify-center items-center h-screen
      text-xl font-bold`}
      column={true}
    >
      <NotFoundSvg />
      404 – Page Not Found
    </Flex>
  )
}
