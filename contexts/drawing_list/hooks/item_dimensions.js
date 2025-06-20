import { Dimensions } from 'react-native'
import { useMemo } from 'react'

/**
 * @typedef { object } Layout
 * @property { number } width
 * @property { number } height
 * @property { number } spacing
 */

/**
 * @param { 'grid' | 'list' } viewMode
 * @returns { Layout }
 */
export function useItemDimensions( viewMode ) {
  const { width } = Dimensions.get( 'window' )
  return useMemo( () => {
    const horizontalPadding = 16
    const spacing = 12
    if( viewMode === 'grid' ) {
      // For grid view (2 columns)
      const itemWidth = ( width - horizontalPadding * 2 - spacing ) / 2
      return {
        width: itemWidth,
        height: itemWidth,
        spacing,
      }
    }
    // For list view
    return {
      width: width - horizontalPadding * 2,
      height: 100,
      spacing,
    }
  }, [ viewMode, width ] )
}
