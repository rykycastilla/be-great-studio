import { PanResponder } from 'react-native'
import { useRef } from 'react'

/**
 * @import { PanResponderInstance } from 'react-native'
 */

/**
 * @param { ( x:number, y:number ) => void } coordinatesCallback
 * @returns { PanResponderInstance }
 */
export function usePanResponder( coordinatesCallback ) {
  return useRef(
    PanResponder.create( {
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: ( evt ) => {
        coordinatesCallback( evt.nativeEvent.locationX, evt.nativeEvent.locationY )
      },
      onPanResponderMove: ( evt ) => {
        coordinatesCallback( evt.nativeEvent.locationX, evt.nativeEvent.locationY )
      },
    } ),
  ).current
}
