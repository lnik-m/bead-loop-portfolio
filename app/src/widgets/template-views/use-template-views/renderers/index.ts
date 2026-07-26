import { renderLoomBead } from './loom'
import { renderCrossBead } from './cross'
import type { BeadRenderer } from './types'

export const RENDER_STRATEGIES: Record<string, BeadRenderer> = {
  loom: renderLoomBead,
  peyote: renderLoomBead,
  cross: renderCrossBead
}

export { renderEmptyBead } from './empty'
export { renderCheckmark } from './check'
export { renderEditorFrame } from './frame'
