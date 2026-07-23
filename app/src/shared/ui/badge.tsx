import { Flex } from './flex'

interface Props {
  text: string
  className?: string
}

export const Badge = ({ text, className }: Props) => {
  return (
    <Flex
      className={`items-center font-bold px-[10px] rounded-full text-secondary-50 bg-accent-500 text-xs w-fit ${className}`}
    >
      {text}
    </Flex>
  )
}
