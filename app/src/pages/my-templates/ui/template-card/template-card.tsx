import { Link } from 'react-router'
import type { Template } from 'core/collections'
import { routes } from 'app/routes'
import { TemplateViews } from 'widgets'
import { useI18n } from 'features/i18n'
import { Flex } from 'shared/ui'
import { TemplateMenu } from './template-menu'

interface Props {
  template: Template
}

export const TemplateCard = ({ template }: Props) => {
  const { localize } = useI18n()
  return (
    <Flex
      className="w-[268px] h-[208px] gap-0
      rounded-md border-[4px]
    bg-bead-loop-light-50 dark:bg-bead-loop-gray-20
    border-bead-loop-light-50 dark:border-bead-loop-gray-20"
      isGap
      column
    >
      <Link to={`${routes.editTemplate}${template.id}`} state={template}>
        <div
          className="flex items-center justify-center
            w-full h-[144px]
            bg-support-50 dark:bg-bead-loop-gray
            rounded-t overflow-hidden"
        >
          <TemplateViews
            className="scale-[0.5] [&>canvas]:max-w-full [&>canvas]:max-h-full [&>canvas]:object-contain"
            schema={template.schema}
            type={template.type}
          />
        </div>
      </Link>
      <Flex className="justify-between p-2">
        <Flex
          className="gap-0 text-bead-loop-dark dark:text-bead-loop-blue-light"
          column
          isGap
        >
          <h4 className="truncate max-w-[210px]" title={template.title}>
            {template.title}
          </h4>
          <div className="opacity-50 text-sm">
            {localize(`dashboard.schemaTypes.${template.type}`)}
          </div>
        </Flex>
        <TemplateMenu templateId={template.id} />
      </Flex>
    </Flex>
  )
}
