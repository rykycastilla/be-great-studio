// @ts-check

/// <reference path="./BGPX.d.ts" />
/// <reference path="./BufferedURL.d.ts" />
/// <reference path="./PngMetadata.d.ts" />

/**
 * @namespace BGPX
 */
Object.assign( window, { BGPX:{} } )

const BGPX_CHUNK = 'bGPX'

/**
 * @param { string } pngUrl
 * @param { string } name
 * @param { number } resolution
 * @param { string } aspectRatio
 * @param { number } date
 * @returns { Promise<string> }
 */
async function encode( pngUrl, name, resolution, aspectRatio, date ) {
  // Creating BGPX metadata chunk
  const encoder = new TextEncoder()
  const metadata = JSON.stringify( { name, resolution, aspectRatio, date } )
  const bgpxChunk = PngMetadata.createChunk( BGPX_CHUNK, encoder.encode( metadata ) )
  // Saving metadata
  const imageBuffer = await BufferedURL.toBuffer( pngUrl )
  const chunkList = PngMetadata.splitChunks( imageBuffer )
  chunkList.splice( -1, 0, bgpxChunk )
  const bgpxImageBuffer = PngMetadata.joinChunks( chunkList )
  return BufferedURL.toURL( bgpxImageBuffer, 'image/bgpx' )
}

/**
 * @param { string } bgpxUrl
 * @returns { Promise<BGPX.Bgpx> }
 */
async function decode( bgpxUrl ) {
  // Extracting metadata
  const bgpxImageBuffer = await BufferedURL.toBuffer( bgpxUrl )
  const chunkList = PngMetadata.splitChunks( bgpxImageBuffer )
  const metadataChunk = /** @type { typeof chunkList[ number ] } */ ( chunkList.find( ( chunk ) => chunk.type === BGPX_CHUNK ) )
  // Decoding metadata
  const decoder = new TextDecoder()
  const metadata = decoder.decode( metadataChunk.data )
  const properties = JSON.parse( metadata )
  // Getting basic PNG
  const metadataIndex = chunkList.indexOf( metadataChunk )
  chunkList.splice( metadataIndex, 1 )
  const imageBuffer = PngMetadata.joinChunks( chunkList )
  const base64Url = await BufferedURL.toURL( imageBuffer, 'image/png' )
  // Recovering BGPX data
  return { ...properties, base64Url }
}

export {}
BGPX.encode = encode
BGPX.decode = decode
