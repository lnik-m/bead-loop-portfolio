import { Flex } from 'shared/ui'

export const EditorSkeleton = () => {
  return (
    <Flex className="grid grid-cols-7 h-full gap-6">
      <Flex
        column
        className="col-span-5 bg-bead-loop-light-50 dark:bg-bead-loop-gray-20 rounded-2xl p-4"
      >
        <Flex className="justify-between">
          <Flex>
            <div className="animate-pulse p-0.5 w-[34px] h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-[34px] h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-36 h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          </Flex>
          <Flex>
            <div className="animate-pulse p-0.5 w-[34px] h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-[34px] h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-[34px] h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-[34px] h-[34px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          </Flex>
        </Flex>
        <div
          className="animate-pulse flex overflow-scroll scroll-m-2 scr bg-white rounded-xl h-full p-3 justify-center items-center"
          style={{
            minHeight: 'calc(100vh - 198px)',
            maxHeight: 'calc(100vh - 198px)'
          }}
        ></div>
      </Flex>
      <Flex
        column
        className="col-span-2
      bg-bead-loop-light-50 dark:bg-bead-loop-gray-20
       h-full rounded-2xl p-4 text-[15px] justify-between"
      >
        <Flex column>
          <div className="animate-pulse p-0.5 w-full h-[60px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          <div className="animate-pulse p-0.5 w-full h-[60px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          <Flex className="grid grid-cols-2">
            <div className="animate-pulse p-0.5 h-[60px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 h-[60px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          </Flex>
        </Flex>

        <Flex column>
          <div className="animate-pulse p-0.5 w-full h-[40px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          <div className="animate-pulse p-0.5 w-full h-[40px] rounded bg-support-50 dark:bg-bead-loop-gray"></div>
        </Flex>
      </Flex>
    </Flex>
  )
}
