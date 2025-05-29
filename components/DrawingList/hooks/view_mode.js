import { DrawingListContext } from '../context'
import { useContext } from 'react'

/**
 * @returns { [ DrawingListContext[ 'viewMode' ], DrawingListContext[ 'setViewMode' ] ] }
 */
export function useViewMode() {
  const { viewMode, setViewMode } = useContext( DrawingListContext )
  return [ viewMode, setViewMode ]
}
