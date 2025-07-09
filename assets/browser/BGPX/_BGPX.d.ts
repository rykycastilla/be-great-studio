declare namespace _BGPX {

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

  class Bgpx {

    static readonly MAGIC_NUMBER: string
    readonly name: string
    readonly resolution: number
    readonly aspectRatio: string
    readonly date: number
    readonly data: Uint8ClampedArray

    constructor(
      name: string, resolution: number, aspectRatio: string, date: number, imageData:Uint8ClampedArray,
    )

  }

  function bgpxToBase64( bgpx:Bgpx ): string

}

