import { useCallback } from 'react'
import { usePointsOfElement } from '@/hooks/points_of_element'

/**
 * @import { LayoutChangeEvent } from 'react-native'
 */

/**
 * @typedef { object } BoardPointsResult
 * @property { ( x:number, y:number ) => boolean } checkIsIn
 * @property { ( event:LayoutChangeEvent ) => void } handleBoardLayout
 * @property { ( event:LayoutChangeEvent ) => void } handleObstacleLayout
 */

/**
 * @returns { BoardPointsResult }
 */
export function useBoardPoints() {

  const { checkIsIn:checkIsInBoard, handleElementLayout:handleBoardLayout } = usePointsOfElement()
  const { checkIsIn:checkIsInObstacle, handleElementLayout:handleObstacleLayout } = usePointsOfElement()

  const checkIsIn = useCallback(
    /** @type { ( x:number, y:number ) => boolean } */
    ( x, y ) => {
      const isInBoard = checkIsInBoard( x, y )
      const isInObstacle = checkIsInObstacle( x, y )
      return isInBoard && !isInObstacle
    }, [ checkIsInBoard, checkIsInObstacle ] )

  return { checkIsIn, handleBoardLayout, handleObstacleLayout }

}
