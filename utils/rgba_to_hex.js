/**
 * @param { string } rgba
 * @returns { string }
 */
export function rgbaToHex( rgba ) {
  // Detecting hex data
  const match = /** @type { [ string, string, string, string ] | null } */ (
    rgba.match( /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*(\d*(?:\.\d+)?)?\s*\)$/ )
  )
  // Using ultra back by default
  if( !match ) {
    return '#000000'
  }
  // Separating hex data
  const r = parseInt( match[ 1 ] ).toString( 16 ).padStart( 2, '0' )
  const g = parseInt( match[ 2 ] ).toString( 16 ).padStart( 2, '0' )
  const b = parseInt( match[ 3 ] ).toString( 16 ).padStart( 2, '0' )
  // Building hex code
  return ( `#${ r }${ g }${ b }` ).toUpperCase()
}
