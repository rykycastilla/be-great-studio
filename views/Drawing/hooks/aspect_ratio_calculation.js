import { useMemo } from 'react'

/**
 * @param { string } aspectRatio  a `x:y` string representing the aspect ratio (e.g., "3:4", "9:16") where both are integers
 * @returns { number }  the calculated aspect ratio as a float number
 */
export function useAspectRatioCalculation( aspectRatio ) {
  return useMemo( () => {
    const [ width, height ] = aspectRatio.split( ':' )
    if( ( width === undefined ) || ( height === undefined ) ) { return NaN }
    return Number( width ) / Number( height )
  }, [ aspectRatio ] )
}
