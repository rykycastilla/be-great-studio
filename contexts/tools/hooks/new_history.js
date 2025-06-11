import { ToolsContext } from '../context'
import { useContext, useEffect } from 'react'

/**
 * @import { HistoryService } from '../services'
 */

/**
 * @param { HistoryService } history
 */
export function useNewHistory( history ) {
  const { canUndo, canRedo, undo, redo } = history
  const { setHistory } = useContext( ToolsContext )
  useEffect( () => {
    setHistory( { canUndo, canRedo, undo, redo } )
  }, [ setHistory, canUndo, canRedo, undo, redo ] )
}
