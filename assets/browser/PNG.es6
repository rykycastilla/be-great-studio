// @ts-check

/// <reference path="./PNG.d.ts" />
/// <reference path="./ImageUtils.d.ts" />

/**
 * @namespace PNG
 */
Object.assign( window, { PNG:{} } )

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
 * @returns { Promise<string> }
 */
async function extractImageData( canvas ) {
  const file = await canvas.convertToBlob()
  const reader = new FileReader()
  /** @type { Promise<string> } */ const extractingImage = new Promise( ( resolve ) => {
    reader.onloadend = () => resolve( /** @type { string } */ ( reader.result ) )
  } )
  reader.readAsDataURL( file )
  return extractingImage
}

/**
 * @param { string } base64Url
 * @param { number } resolution
 * @returns { Promise<string> }
 */
async function reScale( base64Url, resolution ) {
  const image = await ImageUtils.buildImage( base64Url )
  const [ scaledWidth, scaledHeight ] = scale( image, resolution )
  const canvas = new OffscreenCanvas( scaledWidth, scaledHeight )
  // Re-scaling image
  const ctx = /** @type { OffscreenCanvasRenderingContext2D } */ ( canvas.getContext( '2d' ) )
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage( image, 0, 0, scaledWidth, scaledHeight )
  // Sending scaled image
  const reescaledData = await extractImageData( canvas )
  return reescaledData
}

export {}
PNG.reScale = reScale
