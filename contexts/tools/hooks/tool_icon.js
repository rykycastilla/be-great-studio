import { Tool } from 'react-native-drawing'
import { useMemo } from 'react'

/**
 * @import { ExpoIcon } from '@/types/ExpoIcon'
 */

/**
 * @param { Tool } tool
 * @returns { ExpoIcon }
 */
export function useToolIcon( tool ) {
  return useMemo( () => {
    /* eslint-disable */
    return ( tool === Tool.SQUARE_DOT_PEN ) ? 'pencil'
      : ( tool === Tool.ERASER ) ? 'ellipse-outline'
      : ( tool === Tool.FILLER ) ? 'color-fill-outline'
      : ( tool === Tool.PENCIL ) ? 'brush-outline'
      : 'warning-outline'
    /* eslint-enable */
  }, [ tool ] )
}
