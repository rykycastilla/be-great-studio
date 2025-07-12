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

export {}
BGPX.encode = encode
