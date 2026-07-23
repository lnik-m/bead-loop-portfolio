import { IconCheck } from '@tabler/icons-react'

interface Props {
  isEditor: boolean
  color?: string
  isBeaded?: boolean
  onClick?: () => void
}

export const Bead = ({ isEditor, color, isBeaded, onClick }: Props) => {
  return (
    <div
      onClick={() => {
        if (!isEditor && !color) return
        if (!onClick) return
        onClick()
      }}
      className={`
      ${isEditor || color ? 'shadow-lg' : ''}
      relative w-[30px] h-[30px] rounded-full ${
        isEditor && 'border-[1px] border-secondary-500'
      }`}
      style={{ background: color, borderColor: color }}
    >
      {isBeaded && (
        <>
          <div className="absolute w-[30px] h-[30px] rounded-full bg-secondary-950 opacity-60" />
          <IconCheck
            size={24}
            className="absolute text-secondary-50 mt-[3px] ml-[3px]"
          />
        </>
      )}
    </div>
  )
}
