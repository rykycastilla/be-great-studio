// @ts-check

/// <reference path="./ImageUtils.d.ts" />

/**
 * @namespace ImageUtils
 */
Object.assign( window, { ImageUtils:{} } )

/**
 * @param { string } src
 * @returns { Promise<HTMLImageElement> }
 */
function buildImage( src ) {
  const image = new Image()
  /** @type { Promise<HTMLImageElement> } */ const buildingImage = new Promise( ( resolve ) => {
    image.onload = () => resolve( image )
  } )
  image.src = src
  return buildingImage
}

/**
 * @param { HTMLImageElement } image
 * @param { number } newResolution
 * @returns { [ number, number ] }  `[ width, height ]`
 */
function scale( image, newResolution ) {
  const { width, height } = image
  const scale = newResolution / width
  return [ width * scale, height * scale ]
}

/**
 * @param { OffscreenCanvas } canvas
 * @param { string } format
 * @returns { Promise<string> }
 */
async function extractImageData( canvas, format ) {
  const file = await canvas.convertToBlob( { type:`image/${ format }` } )
  const reader = new FileReader()
  /** @type { Promise<string> } */ const extractingImage = new Promise( ( resolve ) => {
    reader.onloadend = () => resolve( /** @type { string } */ ( reader.result ) )
  } )
  reader.readAsDataURL( file )
  return extractingImage
}

/**
 * @param { string } base64Url
 * @param { string } format
 * @param { number } resolution
 * @returns { Promise<string> }
 */
async function convert( base64Url, format, resolution ) {
  const image = await buildImage( base64Url )
  const [ scaledWidth, scaledHeight ] = scale( image, resolution )
  const canvas = new OffscreenCanvas( scaledWidth, scaledHeight )
  // Re-scaling image
  const ctx = /** @type { OffscreenCanvasRenderingContext2D } */ ( canvas.getContext( '2d' ) )
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage( image, 0, 0, scaledWidth, scaledHeight )
  // Sending scaled image
  const reescaledData = await extractImageData( canvas, format )
  return reescaledData
}

export {}
ImageUtils.convert = convert
