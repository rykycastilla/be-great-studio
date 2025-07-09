// @ts-check

/// <reference path="./BGPX.d.ts" />
/// <reference path="./_BGPX.d.ts" />

/**
 * @param { string } name
 * @param { number } resolution
 * @param { string } aspectRatio
 * @param { number } date
 * @param { number[] } byteList
 */
function buildHeader( name, resolution, aspectRatio, date, byteList ) {
  const bytesUtility = new _BGPX.ByteStreamUtility( byteList )
  bytesUtility.appendString( _BGPX.MAGIC_NUMBER )
  bytesUtility.appendString( name, true )
  bytesUtility.addInt( resolution, 2 )
  bytesUtility.appendString( aspectRatio, true )
  bytesUtility.addInt( date, 8 )
}

/**
 * @param { number } index
 * @param { Uint8ClampedArray } imageData
 * @returns { [ number, number, number, number ] | null }  `[ red, green, blue, alpha ]`
 */
function extractColorChanels( index, imageData ) {
  const colorIndex = index * 4
  /** @type { number[] } */ const color = []
  for( let i = colorIndex; i < colorIndex + 4; i++ ) {
    const colorChanel = imageData[ i ]
    if( colorChanel === undefined ) { return null }
    color.push( colorChanel )
  }
  return /** @type { [ number, number, number, number ] } */ ( color )
}

/**
 * @param { [ number, number, number, number ] } a
 * @param { [ number, number, number, number ] } b
 * @returns { boolean }
 */
function compareColors( a, b ) {
  return ( a[ 0 ] === b[ 0 ] ) && ( a[ 1 ] === b[ 1 ] ) && ( a[ 2 ] === b[ 2 ] ) && ( a[ 3 ] === b[ 3 ] )
}

/**
 * @param { number } amount
 * @param { number[] } byteList
 */
function addInvisible( amount, byteList ) {
  const invisible = [ 0, 0, 0 ]
  byteList.push( ...invisible, amount )
}

/**
 * @param { [ number, number, number, number ] } color  `[ red, green, blue, alpha ]`
 * @returns { boolean }
 */
function isInvisible( color ) {
  const [ red, green, blue, alpha ] = color
  return ( red === 0 ) && ( green === 0 ) && ( blue === 0 ) && ( alpha === 0 )
}

/**
 * @param { [ number, number, number ] } color  `[ red, green, blue ]`
 * @returns { boolean }
 */
function isBlack( color ) {
  const [ red, green, blue ] = color
  return ( red === 0 ) && ( green === 0 ) && ( blue === 0 )
}

/**
 * @private
 * @param { number } amount
 * @param { number[] } byteList
 */
function addBlack( amount, byteList ) {
  // This is only a representation of the color to avoid collisions with `invisible` value
  // render implementations must be used 0, 0, 0 for black
  const black = [ 0, 0, 1 ]
  byteList.push( ...black, amount )
}

/**
 * @param { [ number, number, number ] } color  `[ red, green, blue ]`
 * @param { number } amount
 * @param { number[] } byteList
 */
function addColor( color, amount, byteList ) {
  byteList.push( ...color, amount )
}

/**
 * @private
 * @param { [ number, number, number, number ] } color  `[ red, green, blue, alpha ]`
 * @param { number } amount
 * @param { number[] } byteList
 */
function writeColorData( color, amount, byteList ) {
  const [ red, green, blue ] = color
  /** @type { [ number, number, number ] } */ const solidColor = [ red, green, blue ]
  if( isInvisible( color ) ) { addInvisible( amount, byteList ) }
  else if( isBlack( solidColor ) ) { addBlack( amount, byteList ) }
  else { addColor( solidColor, amount, byteList ) }
}

/**
 * @param { number[] } byteList
 * @param { Uint8ClampedArray } imageData
 */
function buildBody( byteList, imageData ) {
  let amount = 0
  const totalPixels = Math.floor( imageData.length / 4 )
  for( let i = 0; i < totalPixels; i++ ) {
    amount++
    const color = /** @type { [ number, number, number, number ] } */ ( extractColorChanels( i, imageData ) )
    const nextColor = extractColorChanels( i + 1, imageData )
    const areDifferent = ( nextColor === null ) ? true : !compareColors( color, nextColor )
    const isLatest = ( i === ( totalPixels - 1 ) )
    if( areDifferent || ( amount === _BGPX.ByteStreamUtility.MAX_BYTE_SIZE ) || isLatest ) {
      writeColorData( color, amount, byteList )
      amount = 0
    }
  }
}

/**
 * @param { string } name
 * @param { number } resolution
 * @param { string } aspectRatio
 * @param { number } date
 * @param { Uint8ClampedArray } imageData
 * @returns { Uint8ClampedArray }
 */
function encode( name, resolution, aspectRatio, date, imageData ) {
  /** @type { number[] } */ const byteList = []
  buildHeader( name, resolution, aspectRatio, date, byteList )
  buildBody( byteList, imageData )
  return new Uint8ClampedArray( byteList )
}

export {}
_BGPX.encode = encode
