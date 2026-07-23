import { type RefObject, useRef } from 'react'
import { toJpeg } from 'html-to-image'
import type { Template } from 'core/collections'
import { EditorProvider } from 'app/providers'
import { Flex } from 'shared/ui'
import { EditorArea, EditorSettings } from './ui'

interface Props {
  template: Template
  isNew?: boolean
}

export const Editor = ({ template, isNew }: Props) => {
  const schemaRef = useRef(null)
  const exportSchema = (ref: RefObject<any>) => {
    toJpeg(ref.current, { cacheBust: false }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = `${template.title
        .toLowerCase()
        .split(' ')
        .join('-')}.jpeg`
      link.href = dataUrl
      link.click()
    })
  }
  return (
    <EditorProvider template={template}>
      <Flex className="grid grid-cols-7 h-full gap-6">
        <EditorArea schemaRef={schemaRef} />
        <EditorSettings
          schemaRef={schemaRef}
          exportSchemaAction={exportSchema}
          isNew={isNew}
        />
      </Flex>
    </EditorProvider>
  )
}
