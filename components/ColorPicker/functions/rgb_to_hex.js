/**
 * @param { number } r
 * @param { number } g
 * @param { number } b
 * @returns { string }
 */
export function rgbToHex( r, g, b ) {
  return `#${ ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 ).toUpperCase() }`
}
