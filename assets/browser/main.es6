// @ts-check

/// <reference path="NativeBridge.d.ts" />
/// <reference path="./PNG.d.ts" />
/// <reference path="./PngMetadata.d.ts" />

export function main() {
  NativeBridge.onCall( 'prepare-png', preparePng )
  NativeBridge.onCall( 'convert-bgpx', convertBgpx )
  NativeBridge.onCall( 'decode-bgpx', decodeBgpx )
}

/**
 * @typedef { object } ConvertImageArgs
 * @property { string } data
 * @property { number } resolution
 */

/**
 * @param { ConvertImageArgs } args
 * @property { string } data
 * @property { number } resolution
 * @returns { Promise<string> }
 */
function preparePng( args ) {
  const { data, resolution } = args
  return PNG.reScale( data, resolution )
}

/**
 * @typedef { object } ConvertBgpxArgs
 * @property { string } data
 * @property { string } name
 * @property { number } resolution
 * @property { string } aspectRatio  `${ number }:${ number }` pattern
 * @property { number } date
 */

/**
 * @param { ConvertBgpxArgs } args
 * @returns { Promise<string> }
 */
function convertBgpx( args ) {
  const { data, name, resolution, aspectRatio, date } = args
  return BGPX.encode( data, name, resolution, aspectRatio, date )
}

/**
 * @typedef { object } DecodeBgpxArgs
 * @property { string } data
 */

/**
 * @param { DecodeBgpxArgs } args
 * @returns { ReturnType<typeof BGPX.decode> }
 */
function decodeBgpx( args ) {
  const { data } = args
  return BGPX.decode( data )
}

window.addEventListener( 'load', main )

export {}
