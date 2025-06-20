/**
 * @param { string } aspectRatio
 * @returns { number }
 */
export function calcAspectRatio( aspectRatio ) {
  const [ width, height ] = aspectRatio.split( ':' )
  return Number( width ) / Number( height )
}
