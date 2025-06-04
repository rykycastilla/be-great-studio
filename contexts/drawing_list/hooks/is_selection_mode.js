import { DrawingListContext } from '../context'
import { useContext } from 'react'

/**
 * @returns { [ boolean, ( setIsSelectionMode:boolean ) => void ] }
 */
export function useIsSelectionMode() {
  const { isSelectionMode, setIsSelectionMode } = useContext( DrawingListContext )
  return [ isSelectionMode, setIsSelectionMode ]
}
