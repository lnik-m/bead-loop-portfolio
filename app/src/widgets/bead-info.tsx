import { Flex } from 'shared/ui'

interface Props {
  color: string
  count: number
}

export const BeadInfo = ({ color, count }: Props) => {
  return (
    <Flex className="items-center text-[14px]">
      <div
        className="rounded-full h-4 w-4"
        style={{
          background: color
        }}
      />
      <i>{color}</i> – {count}
    </Flex>
  )
}
