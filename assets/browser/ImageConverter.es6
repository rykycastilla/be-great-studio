// @ts-check

/// <reference path="./ImageConverter.d.ts" />

/**
 * @namespace ImageConverter
 */
Object.assign( window, { ImageConverter:{} } )

/**
 * @param { string } data
 * @returns { Promise<HTMLImageElement> }
 */
function buildImage( data ) {
  const image = new Image()
  /** @type { Promise<HTMLImageElement> } */ const buildingImage = new Promise( ( resolve ) => {
    image.onload = () => resolve( image )
  } )
  image.src = data
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
 * @param { string } data
 * @param { number } resolution
 * @returns { Promise<string> }
 */
async function convert( data, resolution ) {
  const image = await buildImage( data )
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
ImageConverter.convert = convert
