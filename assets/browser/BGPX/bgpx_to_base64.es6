// @ts-check

/// <reference path="./_BGPX.d.ts" />

/**
 * @param { Uint8ClampedArray } bgpx
 * @returns { string }
 */
function bgpxToBase64( bgpx ) {
  let encoded = ''
  for ( const byte of bgpx ) {
    encoded += String.fromCharCode( byte )
  }
  return _BGPX.BASE64_PREFIX + btoa( encoded )
}

_BGPX.bgpxToBase64 = bgpxToBase64
