import type { Project, Template } from 'core/collections'
import { useTemplateViews } from './use-template-views'

interface Props {
  schema: Template['schema'] | Project['schema']
  type: Template['type']
  className: string
  onClick?: (rows: number, columns: number) => void
  isEditor?: boolean
  isProject?: boolean
}

export const TemplateViews = ({
  schema,
  type,
  className,
  onClick,
  isEditor = false,
  isProject = false
}: Props) => {
  const { canvasRef, handleClick, canvasWidth, canvasHeight } =
    useTemplateViews({
      type,
      schema,
      isEditor,
      isProject,
      onClick
    })
  return (
    <div className={`overflow-auto ${className}`}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          display: 'block',
          touchAction: 'none'
        }}
        onClick={handleClick}
      />
    </div>
  )
}
