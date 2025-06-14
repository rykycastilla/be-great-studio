import { COLOR_LIST, DEFAULT_COLOR } from '../constants'
import { Size } from '../models'
import { Tool } from 'react-native-drawing'
import { ToolsContext } from '../context'
import { useState } from 'react'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { ReactElement, ReactNode } from 'react'
 * @import { HistoryService } from '../services'
 */

/**
 * @typedef { object } ToolsProviderProps
 * @property { ReactNode } children
 * @property { string } id
 */

/**
 * @param { ToolsProviderProps } props
 * @returns { ReactElement }
 */
const ToolsProvider = ( props ) => {

  const { children, id } = props
  const [ size, setSize ] = useStorageState( Size.SMALL, `size-${ id }` )

  // Tool config
  const [ tool, setTool ] = useStorageState( Tool.SQUARE_DOT_PEN, `tool-${ id }` )
  const [ auxTool, setAuxTool ] = useState( /** @type { Tool | null } */ ( null ) )
  const currentTool = ( auxTool !== null ) ? auxTool : tool

  // Color config
  const [ colorList, setColorList ] = useStorageState( COLOR_LIST, `color-list-${ id }` )
  const [ color, setColor ] = useStorageState( DEFAULT_COLOR, `color-${ id }` )
  const [ history, setHistory ] = useState( /** @type { HistoryService | null } */ ( null ) )

  return (
    <ToolsContext.Provider
      value={ {
        currentTool,
        tool, setTool,
        auxTool, setAuxTool,
        size, setSize,
        colorList, setColorList,
        color, setColor,
        history, setHistory,
      } }>
      { children }
    </ToolsContext.Provider>
  )

}

export default ToolsProvider
