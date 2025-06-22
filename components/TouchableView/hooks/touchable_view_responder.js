import { useRef } from 'react'

/**
 * @import { GestureResponderEvent, NativeTouchEvent } from 'react-native'
 * @import { Responder } from '../types/Responder'
 * @import { Touch } from '../types/Touch'
 */

/**
 * @param { NativeTouchEvent } event
 * @returns { Touch }
 */
function processTouch( event ) {
  const { identifier, locationX, locationY } = event
  return { x:locationX, y:locationY, id:identifier }
}

/**
 * @param { ( touchList:Touch[] ) => void } setTouchList
 * @returns { Responder }
 */
export function useTouchableViewResponder( setTouchList ) {

  /** @type { ( event:GestureResponderEvent ) => void } */
  const handleTouchList = ( event ) => {
    const touchList = event.nativeEvent.touches.map( ( touch ) => processTouch( touch ) )
    setTouchList( touchList )
  }

  return useRef( {
    onTouchStart:handleTouchList,
    onTouchMove:handleTouchList,
    onTouchEnd:handleTouchList,
    onTouchCancel:handleTouchList,
  } ).current

}
