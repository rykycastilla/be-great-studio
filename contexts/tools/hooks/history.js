import { ToolsContext } from '../context'
import { useContext } from 'react'

/**
 * @import { HistoryService } from '../services'
 */

function empty() {}

/**
 * @returns { HistoryService }
 */
export function useHistory() {
  const { history } = useContext( ToolsContext )
  return history ?? { canUndo:false, canRedo:false, undo:empty, redo:empty }
}
