import { Loader } from '@mantine/core'
import { Flex } from 'shared/ui'

// TODO convert to skeleton
export const DashboardSkeleton = () => {
  return (
    <Flex className="items-end justify-center h-1/2 mt-[50px]">
      <Loader color="accent" size="lg" />
    </Flex>
  )
}
