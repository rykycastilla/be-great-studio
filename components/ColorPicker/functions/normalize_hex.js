/**
 * Fix the format of the hex code
 * @param { string } hex
 * @returns { string }
 */
export function normalizeHex( hex ) {
  // Ensuring # use
  if ( !hex.startsWith( '#' ) ) {
    hex = `#${ hex }`
  }
  // Convert short format (3 digits) to large format (6 digits)
  if ( hex.length === 4 ) {
    hex = `#${ hex[ 1 ] }${ hex[ 1 ] }${ hex[ 2 ] }${ hex[ 2 ] }${ hex[ 3 ] }${ hex[ 3 ] }`
  }
  return hex.toUpperCase()
}
