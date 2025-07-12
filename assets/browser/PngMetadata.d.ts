declare namespace PngMetadata {

  interface Chunk {
    size: number
    type: string
    data: Uint8Array
    crc: number
  }

  function isPNG( data: ArrayBuffer | Uint8Array ): boolean

  function splitChunks( data: ArrayBuffer | Uint8Array ): Chunk[]

  function joinChunks( chunks: Chunk[] ): ArrayBuffer

  function createChunk( type: string, data: Uint8Array ): Chunk

}
