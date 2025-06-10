import { Tool } from 'react-native-drawing'
import { ToolsContext } from '../context'
import { useState } from 'react'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ToolsProviderProps
 * @property { ReactElement } children
 * @property { string } id
 */

/**
 * @param { ToolsProviderProps } props
 * @returns { ReactElement }
 */
const ToolsProvider = ( props ) => {
  const { children, id } = props
  const [ tool, setTool ] = useStorageState( Tool.SQUARE_DOT_PEN, `tool-${ id }` )
  const [ auxTool, setAuxTool ] = useState( /** @type { Tool | null } */ ( null ) )
  const currentTool = ( auxTool !== null ) ? auxTool : tool
  return (
    <ToolsContext.Provider value={ { currentTool, tool, setTool, auxTool, setAuxTool } }>
      { children }
    </ToolsContext.Provider>
  )
}

export default ToolsProvider
