// @ts-check

/// <reference path="ImageConverter.d.ts" />
/// <reference path="NativeBridge.d.ts" />

export function main() {
  NativeBridge.onCall( 'prepare-png', preparePng )
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
  return ImageConverter.convert( data, resolution )
}

window.addEventListener( 'load', main )
