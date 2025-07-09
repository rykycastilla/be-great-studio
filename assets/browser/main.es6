// @ts-check

/// <reference path="./BGPX/BGPX.d.ts" />
/// <reference path="NativeBridge.d.ts" />
/// <reference path="./PNG.d.ts" />

export function main() {
  NativeBridge.onCall( 'prepare-png', preparePng )
  NativeBridge.onCall( 'convert-bgpx', convertBgpx )
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
 * @property { string } aspectRatio  `${ number }:${ number }` pattern
 * @property { number } date
 */

/**
 * @param { ConvertBgpxArgs } args
 * @returns { Promise<string> }
 */
function convertBgpx( args ) {
  const { data, name, aspectRatio, date } = args
  return BGPX.convert( data, name, aspectRatio, date )
}

window.addEventListener( 'load', main )
