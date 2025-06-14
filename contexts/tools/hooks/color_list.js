import { ToolsContext } from '../context'
import { useContext } from 'react'

/**
 * @returns { [ string[], ( colorList:string[] ) => void ] }
 */
export function useColorList() {
  const { colorList, setColorList } = useContext( ToolsContext )
  return [ colorList, setColorList ]
}
