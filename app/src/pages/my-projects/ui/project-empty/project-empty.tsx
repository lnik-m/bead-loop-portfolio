import { IconPlus } from '@tabler/icons-react'

import { useI18n } from 'features/i18n'
import { Flex } from 'shared/ui'

export const ProjectEmpty = () => {
  const { localize } = useI18n()
  return (
    <Flex className="items-center justify-center my-32">
      <Flex
        className="items-center justify-center px-4 text-center
    max-w-md w-full bg-bead-loop-light-20/95 dark:bg-bead-loop-error-card backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-bead-loop-rose/20 dark:border-bead-loop-rose/10
    "
        column
      >
        <div className="w-16 h-16 rounded-full bg-bead-loop-purple/10 dark:bg-bead-loop-purple/90 flex items-center justify-center mb-4">
          <IconPlus
            className="w-8 h-8 text-bead-loop-purple dark:text-bead-loop-blue-light"
            stroke={1.5}
          />
        </div>

        <h3 className="text-xl font-semibold text-bead-loop-purple dark:text-bead-loop-blue-light mb-2">
          {localize('projects.empty.title')}
        </h3>

        <p className="text-bead-loop-gray dark:text-bead-loop-blue-light max-w-md">
          {localize('projects.empty.description')}
        </p>
      </Flex>
    </Flex>
  )
}
