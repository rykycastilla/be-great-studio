import { HistoryService } from '../services'
import { Size } from '../models'
import { Tool } from 'react-native-drawing'

export interface ToolsContext {
  currentTool: Tool
  tool: Tool
  setTool( tool:Tool ): void
  auxTool: Tool | null
  setAuxTool( auxTool:Tool|null ): void
  size: Size
  setSize( size:Size ): void
  colorList: string[]
  setColorList( colorList:string[] ): void
  color: string
  setColor( color:string ): void
  history: HistoryService | null
  setHistory( history:HistoryService ): void
}
