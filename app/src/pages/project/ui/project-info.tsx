import { useState } from 'react'
import { useNavigate } from 'react-router'
import { TextInput } from '@mantine/core'
import { routes } from 'app/routes'
import { BeadInfo } from 'widgets'
import { useI18n } from 'features/i18n'
import { useProject } from 'features/project'
import { Button, Flex } from 'shared/ui'

export const ProjectInfo = () => {
  const { localize } = useI18n()
  const {
    project: { materials, title },
    updateProject,
    saveProgress,
    finishBeading,
    isSaving,
    isFinishing
  } = useProject()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  return (
    <Flex
      column
      className="bg-bead-loop-light-50 dark:bg-bead-loop-gray-20 h-full rounded-2xl p-4 text-[15px] justify-between"
    >
      <Flex column>
        <TextInput
          error={error}
          label={localize('projects.labels.title')}
          value={title}
          onChange={({ currentTarget }) => {
            setError(
              !currentTarget.value ? localize('projects.labels.emptyTitle') : ''
            )
            updateProject({ title: currentTarget.value })
          }}
        />
        <p className="font-medium">{localize('projects.labels.materials')}</p>
        {materials.map(bead => (
          <BeadInfo key={bead.color} {...bead} />
        ))}
      </Flex>

      <Flex column>
        <Button
          disabled={!!error}
          loading={isSaving}
          onClick={() => saveProgress().then(() => navigate(routes.myProjects))}
        >
          {localize('projects.buttons.save')}
        </Button>
        <Button
          disabled={!!error}
          loading={isFinishing}
          theme="dark"
          onClick={() =>
            finishBeading().then(() => navigate(routes.myProjects))
          }
        >
          {localize('projects.buttons.finish')}
        </Button>
      </Flex>
    </Flex>
  )
}
