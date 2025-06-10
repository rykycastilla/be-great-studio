import { ToolsContext } from '../context'
import { useContext } from 'react'

/**
 * @import { Tool } from 'react-native-drawing'
 */

/**
 * @typedef { object } ToolsResult
 * @property { Tool } currentTool
 * @property { Tool } tool
 * @property { ( tool:Tool ) => void } setTool
 * @property { Tool | null } auxTool
 * @property { ( auxTool:Tool|null ) => void } setAuxTool
 */

/**
 * @returns { ToolsResult }
 */
export function useTools() {
  const { currentTool, tool, setTool, auxTool, setAuxTool } = useContext( ToolsContext )
  return { currentTool, tool, setTool, auxTool, setAuxTool }
}
