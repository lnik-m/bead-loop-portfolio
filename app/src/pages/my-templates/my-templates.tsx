import { AddButton } from 'widgets'
import { useI18n } from 'features/i18n'
import { useMyTemplates } from 'features/my-templates'
import { Flex } from 'shared/ui'
import { TemplateCard } from './ui'
import { routes } from 'app/routes'

export const MyTemplates = () => {
  const { localize } = useI18n()
  const { myTemplates } = useMyTemplates()
  return (
    <Flex column>
      <Flex className="max-w-full flex-wrap gap-3" isGap>
        <AddButton
          to={`${routes.editTemplate}new`}
          label={localize('dashboard.myTemplates.buttons.newTemplate')}
        />
        {myTemplates?.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </Flex>
    </Flex>
  )
}
