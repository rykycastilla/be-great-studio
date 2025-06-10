import { ToolsContext } from '../context'
import { useContext } from 'react'

/**
 * @returns { [ string, ( color:string ) => void ] }
 */
export function useColor() {
  const { color, setColor } = useContext( ToolsContext )
  return [ color, setColor ]
}
