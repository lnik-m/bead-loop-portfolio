import { useContext } from 'react'
import { ActionsMenuContext } from './actions-menu-context'

export const useActionsMenu = () => {
  const menu = useContext(ActionsMenuContext)
  if (!menu) throw new Error('Error: Actions menu context is not defined')
  return menu
}
