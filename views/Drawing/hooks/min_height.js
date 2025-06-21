import { useCallback, useState } from 'react'

/**
 * @import { LayoutChangeEvent } from 'react-native'
 */

/**
 * @typedef { object } MinHeightResult
 * @property { boolean } minHeightExceed
 * @property { { minHeight:number } } minHeightStyle
 * @property { ( event:LayoutChangeEvent ) => void } handleLayout
 */

/**
 * Uses a `minHeight` value and a layout handler with a RN View to determine if it was exceed
 * (container grew)
 * @param { number } minHeight
 * @returns { MinHeightResult }
 */
export function useMinHeight( minHeight ) {
  const [ minHeightExceed, setMinHeightExceed ] = useState( false )
  const handleLayout = useCallback(
    /** @type { ( event:LayoutChangeEvent ) => void } */
    ( event ) => {
      const { layout } = event.nativeEvent
      setMinHeightExceed( layout.height > ( minHeight * 1.03 ) )
    }, [ minHeight ] )
  const minHeightStyle = { minHeight }
  return { minHeightExceed, minHeightStyle, handleLayout }
}
