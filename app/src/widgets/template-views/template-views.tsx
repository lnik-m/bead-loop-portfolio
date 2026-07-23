import type { Project, Template } from 'core/collections'
import { LoomTemplateView } from './loom'
import { PeyoteTemplateView } from './peyote'

interface Props {
  schema: Template['schema'] | Project['schema']
  type: Template['type']
  className: string
  onClick?: (rows: number, columns: number) => void
  isEditor?: boolean
}

export const TemplateViews = ({
  schema,
  type,
  className,
  onClick,
  isEditor = false
}: Props) => {
  const props = {
    schema,
    className,
    onClick,
    isEditor
  }
  return (
    <>
      {type === 'loom' && <LoomTemplateView {...props} />}
      {type === 'peyote' && <PeyoteTemplateView {...props} />}
    </>
  )
}
