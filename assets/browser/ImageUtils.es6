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

export {}
ImageUtils.buildImage = buildImage
