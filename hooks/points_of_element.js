import { useCallback, useState } from 'react'

/**
 * @import { LayoutChangeEvent } from 'react-native'
 */

/**
 * @typedef { object } Limits
 * @property { number } initX
 * @property { number } initY
 * @property { number } endX
 * @property { number } endY
 */

/**
 * @typedef { object } PointsOfElementResult
 * @property { ( x:number, y:number ) => boolean } checkIsIn
 * @property { ( event:LayoutChangeEvent ) => void } handleElementLayout
 */

/**
 * Provides functionality to detect if coordinates are within an element's boundaries.
 * Tracks element position and dimensions relative to the window using its layout handler.
 * @returns { PointsOfElementResult }
 */
export function usePointsOfElement() {

  const [ elementLimits, setElementLimits ] = useState(
    /** @type { Limits | null } */ ( null ),
  )

  const checkIsIn = useCallback(
    /** @type { ( x:number, y:number ) => boolean } */
    ( x, y ) => {
      if( elementLimits === null ) { return false }
      const { initX, initY, endX, endY } = elementLimits
      return ( ( initX <= x ) && ( x <= endX ) ) && ( ( initY <= y ) && ( y <= endY ) )
    }, [ elementLimits ] )

  const handleElementLayout = useCallback(
    /** @type { ( event:LayoutChangeEvent ) => void } */
    ( event ) => {
      event.target.measureInWindow( ( x, y, width, height ) => {
        const initX = x
        const initY = y
        const endX = x + width
        const endY = y + height
        setElementLimits( { initX, initY, endX, endY } )
      } )
    }, [] )

  return { checkIsIn, handleElementLayout }

}
