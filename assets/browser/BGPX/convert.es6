// @ts-check

/// <reference path="./BGPX.d.ts" />
/// <reference path="./_BGPX.d.ts" />
/// <reference path="../ImageUtils.d.ts" />

/**
 * @param { string } data
 * @param { string } name
 * @param { string } aspectRatio  `${ number }:${ number }` pattern
 * @param { number } date
 * @returns { Promise<string> }
 */
async function convert( data, name, aspectRatio, date ) {
  const image = await ImageUtils.buildImage( data )
  const { width, height } = image
  const canvas = new OffscreenCanvas( width, height )
  const ctx = /** @type { OffscreenCanvasRenderingContext2D } */ ( canvas.getContext( '2d' ) )
  ctx.drawImage( image, 0, 0 )
  const { data:binaryImage } = ctx.getImageData( 0, 0, width, height )
  const bgpx = _BGPX.encode( name, width, aspectRatio, date, binaryImage )
  const convertedData = _BGPX.bgpxToBase64( bgpx )
  return convertedData
}

export {}
BGPX.convert = convert
