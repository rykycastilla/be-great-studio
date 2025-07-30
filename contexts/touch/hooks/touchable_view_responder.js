import { useCallback } from 'react'

/**
 * @import { GestureResponderEvent, NativeTouchEvent } from 'react-native'
 * @import { Point } from '../models/Point'
 * @import { Responder } from '../types/Responder'
 * @import { Touch } from '../models/Touch'
 */

/**
 * @param { NativeTouchEvent } event
 * @param { Point | null } providerPosition
 * @param { ( x:number, y:number ) => boolean } checkIsInAllowedArea
 * @returns { Touch | undefined }
 */
function processTouch( event, providerPosition, checkIsInAllowedArea ) {
  if( providerPosition === null ) { return }
  const { identifier, pageX, pageY } = event
  const isValidArea = checkIsInAllowedArea( pageX, pageY )
  if( !isValidArea ) { return }
  const x = pageX - providerPosition.x
  const y = pageY - providerPosition.y
  return { x, y, id:identifier }
}

/**
 * @param { NativeTouchEvent[] } touches
 * @param { Point | null } providerPosition
 * @param { ( x:number, y:number ) => boolean } checkIsInAllowedArea
 * @returns { Touch[] }
 */
function processTouchList( touches, providerPosition, checkIsInAllowedArea ) {
  /** @type { Touch[] } */ const result = []
  for( const nativeTouch of touches ) {
    const touch = processTouch( nativeTouch, providerPosition, checkIsInAllowedArea )
    if( touch !== undefined ) { result.push( touch ) }
  }
  return result
}

/**
 * @param { Point | null } providerPosition
 * @param { ( touchList:Touch[] ) => void } setTouchList
 * @param { ( x:number, y:number ) => boolean } checkIsInAllowedArea
 * @returns { Responder }
 */
export function useTouchableViewResponder( providerPosition, setTouchList, checkIsInAllowedArea ) {

  const handleTouchList = useCallback(
    /** @type { ( event:GestureResponderEvent ) => void } */
    ( event ) => {
      const { nativeEvent } = event
      const { touches } = nativeEvent
      const touchList = processTouchList( touches, providerPosition, checkIsInAllowedArea )
      setTouchList( touchList )
    }, [ setTouchList, checkIsInAllowedArea, providerPosition ] )

  return {
    onTouchStart:handleTouchList,
    onTouchMove:handleTouchList,
    onTouchEnd:handleTouchList,
    onTouchCancel:handleTouchList,
  }

}
