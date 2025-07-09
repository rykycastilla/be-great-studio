// @ts-check

/// <reference path="./_BGPX.d.ts" />

class ByteStreamUtility {

  /** @readonly */ static MAX_BYTE_SIZE = 255
  /** @readonly */ static BYTE_LENGTH = 8
  /** @private @readonly */ encoder = new TextEncoder()
  /** @private @readonly */ byteList

  /**
   * @param { number[] } byteList
   */
  constructor( byteList ) {
    this.byteList = byteList
  }

  /**
   * @public
   * @param { number } int
   * @param { number } byteLength
   */
  addInt( int, byteLength ) {
    // Creating binary
    int = Math.floor( int )
    let binary = int.toString( 2 )
    // Normalizing binary length (in bytes)
    const reservedSize = byteLength * ByteStreamUtility.BYTE_LENGTH
    if( binary.length > reservedSize ) {
      binary = binary.substring( binary.length - reservedSize )
    }
    else {
      const leadingZeros = reservedSize - binary.length
      binary = ByteStreamUtility.addZeros( leadingZeros ) + binary
    }
    // Adding binary data
    let currentByte = ''
    for( const bit of binary ) {
      currentByte += bit
      if( currentByte.length !== ByteStreamUtility.BYTE_LENGTH ) { continue }
      const intByte = parseInt( currentByte, 2 )
      this.byteList.push( intByte )
      currentByte = ''
    }
  }

  /**
   * @public
   * @param { string } string
   * @param { boolean } [ reserve ]
   */
  appendString( string, reserve ) {
    let binaryString = this.encoder.encode( string )
    let stringSize = binaryString.length
    if( reserve ) {
      if( stringSize > ByteStreamUtility.MAX_BYTE_SIZE ) { stringSize = ByteStreamUtility.MAX_BYTE_SIZE }
      binaryString = binaryString.slice( 0, stringSize )
      this.byteList.push( stringSize )
    }
    this.byteList.push( ...binaryString )
  }

  /**
   * @private
   * @param { number } times
   * @returns { string }
   */
  static addZeros( times ) {
    const string = ''
    return string.padStart( times, '0' )
  }

}

export {}
_BGPX.ByteStreamUtility = ByteStreamUtility
