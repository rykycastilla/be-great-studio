import { useCallback, useState } from 'react'
import { useLongCallback } from '@/hooks/long_callback'
import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { wait } from '@/utils/wait'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { SharedValue } from 'react-native-reanimated'
 */

/**
 * @typedef { object } PreviewHandler
 * @property { Drawing | null } preview
 * @property { SharedValue<number> } previewScale
 * @property { SharedValue<number> } previewOpacity
 * @property { ( item:Drawing ) => void } handleLongPress
 * @property { () => void } handlePressOut
 */

/**
 * @returns { PreviewHandler }
 */
export function usePreview() {

  const [ preview, setPreview ] = useState( /** @type { Drawing | null } */ ( null ) )
  const previewScale = useSharedValue( 1 )
  const previewOpacity = useSharedValue( 0 )

  const handleLongPress = useLongCallback(
    /** @type { ( item:Drawing ) => void } */
    ( item ) => {
      setPreview( item )
      previewScale.value = withSpring( 1, { damping:15 } )
      previewOpacity.value = withTiming( 1, { duration:50 } )
    } )

  const handlePressOut = useCallback( async() => {
    if ( preview !== null ) {
      previewScale.value = withSpring( 0.8, { damping:15 } )
      previewOpacity.value = withTiming( 0, { duration:50 } )
      await wait( 50 )
      setPreview( null )
    }
  }, [ preview, previewScale, previewOpacity ] )

  return { preview, previewScale, previewOpacity, handleLongPress, handlePressOut }

}
