declare namespace _BGPX {

  let MAGIC_NUMBER: string
  let BASE64_PREFIX: string

  class ByteStreamUtility {

    static readonly MAX_BYTE_SIZE: number
    static readonly BYTE_LENGTH: number

    constructor( byteList:number[] )

    /**
     * Add an integer reserving the byte length provided
     */
    public addInt( int:number, byteLength:number ): void

    /**
     * Appends an string to a byte list reserving the first assigned value to ist size
     */
    public appendString( string:string, reserve?:boolean ): void

  }

  /**
   * Transforms a Canvas image data binary array to a BGPX binary file
   */
  function encode(
    name:string, resolution:number, aspectRatio:string, date:number, imageData:Uint8ClampedArray,
  ): Uint8ClmapedArray

  /**
   * Transforms a BGPX binary file to a base64 url
   */
  function bgpxToBase64( bgpx:Uint8ClampedArray ): string

}

