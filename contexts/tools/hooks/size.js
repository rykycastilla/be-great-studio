import { ToolsContext } from '../context'
import { useContext } from 'react'

/**
 * @import { Size } from '../models'
 */

/**
 * @returns { [ Size, ( size:Size ) => void ] }
 */
export function useSize() {
  const { size, setSize } = useContext( ToolsContext )
  return [ size, setSize ]
}
