// @ts-check

/// <reference path="./_BGPX.d.ts" />

class Bgpx {

  /** @readonly */ static MAGIC_NUMBER = 'BGPX'
  
  /** @readonly */ name
  /** @readonly */ resolution
  /** @readonly */ aspectRatio
  /** @readonly */ date
  /** @readonly @type { Uint8ClampedArray } */ #data

  /**
   * @param { string } name
   * @param { number } resolution
   * @param { string } aspectRatio
   * @param { number } date
   * @param { Uint8ClampedArray } imageData
   */
  constructor( name, resolution, aspectRatio, date, imageData ) {
    this.name = name
    this.resolution = resolution
    this.aspectRatio = aspectRatio
    this.date = date
    this.#data = this.buildData( imageData )
  }

  /**
   * @private
   * @param { number[] } byteList
   */
  buildHeader( byteList ) {
    const bytesUtility = new _BGPX.ByteStreamUtility( byteList )
    bytesUtility.appendString( Bgpx.MAGIC_NUMBER )
    bytesUtility.appendString( this.name, true )
    bytesUtility.addInt( this.resolution, 2 )
    bytesUtility.appendString( this.aspectRatio, true )
    bytesUtility.addInt( this.date, 8 )
  }

  /**
   * @private
   * @param { number } amount
   * @param { number[] } byteList
   */
  addInvisible( amount, byteList ) {
    const invisible = [ 0, 0, 0 ]
    byteList.push( ...invisible, amount )
  }

  /**
   * @private
   * @param { number } amount
   * @param { number[] } byteList
   */
  addBlack( amount, byteList ) {
    // This is only a representation of the color to avoid collisions with `invisible` value
    // render implementations must be used 0, 0, 0 for black
    const black = [ 0, 0, 1 ]  
    byteList.push( ...black, amount )
  }

  /**
   * @private
   * @param { [ number, number, number ] } color  `[ red, green, blue ]`
   * @param { number } amount
   * @param { number[] } byteList
   */
  addColor( color, amount, byteList ) {
    byteList.push( ...color, amount )
  }

  /**
   * @private
   * @param { [ number, number, number, number ] } color  `[ red, green, blue, alpha ]`
   * @param { number } amount
   * @param { number[] } byteList
   */
  writeColorData( color, amount, byteList ) {
    const [ red, green, blue ] = color
    /** @type { [ number, number, number ] } */ const solidColor = [ red, green, blue ]
    if( Bgpx.isInvisible( color ) ) { this.addInvisible( amount, byteList ) }
    else if( Bgpx.isBlack( solidColor ) ) { this.addBlack( amount, byteList ) }
    else { this.addColor( solidColor, amount, byteList ) }
  }

  /**
   * @private
   * @param { number[] } byteList
   * @param { Uint8ClampedArray } imageData
   */
  buildBody( byteList, imageData ) {
    let amount = 0
    const totalPixels = Math.floor( imageData.length / 4 )
    for( let i = 0; i < totalPixels; i++ ) {
      amount++
      const color = /** @type { [ number, number, number, number ] } */ ( Bgpx.extractColorChanels( i, imageData ) )
      const nextColor = Bgpx.extractColorChanels( i + 1, imageData )
      const areDifferent = ( nextColor === null ) ? true : !Bgpx.compareColors( color, nextColor )
      const isLatest = ( i === ( totalPixels - 1 ) )
      if( areDifferent || ( amount === _BGPX.ByteStreamUtility.MAX_BYTE_SIZE ) || isLatest ) {
        this.writeColorData( color, amount, byteList )
        amount = 0
      }
    }
  }

  /**
   * @private
   * @param { Uint8ClampedArray } imageData
   * @returns { Uint8ClampedArray } 
   */
  buildData( imageData ) {
    /** @type { number[] } */ const byteList = []
    this.buildHeader( byteList )
    this.buildBody( byteList, imageData )
    return new Uint8ClampedArray( byteList )
  }

  /**
   * A binary representation of the BeGreat Pixel fromat structure
   * @returns { Uint8ClampedArray }
   */
  get data() {
    return new Uint8ClampedArray( this.#data )
  }

  /**
   * @private
   * @param { number } index
   * @param { Uint8ClampedArray } imageData
   * @returns { [ number, number, number, number ] | null }  `[ red, green, blue, alpha ]`
   */
  static extractColorChanels( index, imageData ) {
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
   * @private
   * @param { [ number, number, number, number ] } color  `[ red, green, blue, alpha ]`
   * @returns { boolean }
   */
  static isInvisible( color ) {
    const [ red, green, blue, alpha ] = color
    return ( red === 0 ) && ( green === 0 ) && ( blue === 0 ) && ( alpha === 0 )
  }

  /**
   * @private
   * @param { [ number, number, number ] } color  `[ red, green, blue ]`
   * @returns { boolean }
   */
  static isBlack( color ) {
    const [ red, green, blue ] = color
    return ( red === 0 ) && ( green === 0 ) && ( blue === 0 )
  }

  /**
   * @private
   * @param { [ number, number, number, number ] } a
   * @param { [ number, number, number, number ] } b
   * @returns { boolean }
   */
  static compareColors( a, b ) {
    return ( a[ 0 ] === b[ 0 ] ) && ( a[ 1 ] === b[ 1 ] ) && ( a[ 2 ] === b[ 2 ] ) && ( a[ 3 ] === b[ 3 ] )
  }

}

export {}
_BGPX.Bgpx = Bgpx
