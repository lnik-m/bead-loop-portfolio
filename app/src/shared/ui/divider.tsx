import { Flex } from 'shared/ui'

interface Props {
  label: string
  className?: string
}

export const Divider = ({ label, className }: Props) => {
  return (
    <Flex
      isGap
      className={`items-center text-bead-loop-dark dark:text-support-100 gap-1 ${className}`}
    >
      <span className="text-xs">{label}</span>
      <div className="bg-bead-loop-dark dark:bg-support-100 h-[0.5px] flex-grow " />
    </Flex>
  )
}
