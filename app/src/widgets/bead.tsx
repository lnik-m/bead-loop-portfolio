import { IconCheck } from '@tabler/icons-react'

interface BeadProps {
  isEditor: boolean
  color?: string
  isBeaded?: boolean
  'data-row'?: number
  'data-col'?: number
}

export const Bead = ({
  isEditor,
  color,
  isBeaded,
  'data-row': row,
  'data-col': col,
  ...props
}: BeadProps) => {
  return (
    <div
      data-row={row}
      data-col={col}
      {...props}
      className={`
        relative w-[30px] h-[30px] rounded-full 
        ${isEditor || color ? 'shadow-lg' : ''} 
        ${isEditor && 'border-[1px] border-secondary-500'}
      `}
      style={{
        background: color || 'transparent',
        borderColor: color || undefined
      }}
    >
      {isBeaded && (
        <>
          <div className="absolute inset-0 rounded-full bg-secondary-950 opacity-60" />
          <IconCheck
            size={24}
            className="absolute text-secondary-50 inset-0 m-auto"
          />
        </>
      )}
    </div>
  )
}
