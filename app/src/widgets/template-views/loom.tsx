import type { Project, Template } from 'core/collections'
import { Bead } from 'widgets'
import { Flex } from 'shared/ui'

interface Props {
  className: string
  schema: Template['schema'] | Project['schema']
  onClick?: (rows: number, columns: number) => void
  isEditor: boolean
}

export const LoomTemplateView = ({
  className,
  schema,
  onClick,
  isEditor
}: Props) => {
  return (
    <Flex column isGap className={`gap-0 min-w-fit ${className}`}>
      {schema?.map((row, i) => (
        <Flex key={`col-${i}`} isGap className="gap-0">
          {row?.map((bead, j) => (
            <Bead
              key={`col-${i}-bead-${j}`}
              color={typeof bead === 'string' ? bead : bead.color}
              isBeaded={typeof bead === 'string' ? false : bead.isBeaded}
              isEditor={isEditor}
              onClick={() => {
                if (!onClick) return
                onClick(i, j)
              }}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  )
}
