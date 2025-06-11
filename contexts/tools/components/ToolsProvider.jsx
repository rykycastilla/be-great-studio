import { Size } from '../models'
import { Tool } from 'react-native-drawing'
import { ToolsContext } from '../context'
import { useState } from 'react'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { ReactElement } from 'react'
 * @import { HistoryService } from '../services'
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
  const [ size, setSize ] = useStorageState( Size.MEDIUM, `size-${ id }` )
  const [ color, setColor ] = useStorageState( '#0A84FF', `color-${ id }` )
  const [ history, setHistory ] = useState( /** @type { HistoryService | null } */ ( null ) )
  return (
    <ToolsContext.Provider
      value={ {
        currentTool,
        tool, setTool,
        auxTool, setAuxTool,
        size, setSize,
        color, setColor,
        history, setHistory,
      } }>
      { children }
    </ToolsContext.Provider>
  )
}

export default ToolsProvider
