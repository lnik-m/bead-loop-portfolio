import type { PropsWithChildren } from 'react'
import { Flex } from './flex'

export const ScreenCenter = ({ children }: PropsWithChildren) => {
  return (
    <Flex className="h-screen justify-center items-center mx-auto" column>
      {children}
    </Flex>
  )
}
