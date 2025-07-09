// @ts-check

/// <reference path="./_BGPX.d.ts" />

const BASE64_PREFIX = 'data:image/bgpx;base64,'

/**
 * @param { _BGPX.Bgpx } bgpx
 * @returns { string }
 */
function bgpxToBase64( bgpx ) {
  const binaryData = bgpx.data
  let encoded = ''
  for ( const byte of binaryData ) {
    encoded += String.fromCharCode( byte )
  }
  return BASE64_PREFIX + btoa( encoded )
}

_BGPX.bgpxToBase64 = bgpxToBase64
