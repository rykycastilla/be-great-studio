import { useTools } from './tools'

/**
 * @import { Tool } from 'react-native-drawing'
 */

/**
 * @returns { Tool }
 */
export function useCurrentTool() {
  const { currentTool } = useTools()
  return currentTool
}
