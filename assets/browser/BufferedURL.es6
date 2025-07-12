// @ts-check

/// <reference path="./BufferedURL.d.ts" />

/**
 * @namespace BufferedURL
 */
Object.assign( window, { BufferedURL:{} } )

/**
 * @param { string } url
 * @returns { Promise<ArrayBuffer> }
 */
async function toBuffer( url ) {
  const res = await fetch( url )
  return res.arrayBuffer()
}

/**
 * @param { ArrayBuffer } buffer
 * @param { string } type
 * @returns { Promise<string> }
 */
function toURL( buffer, type ) {
  const file = new Blob( [ buffer ], { type } )
  const reader = new FileReader()
  /** @type { Promise<string> } */ const creatingURL = new Promise( ( resolve ) => {
    reader.onloadend = () => {
      resolve( /** @type { string } */ ( reader.result ) )
    }
  } )
  reader.readAsDataURL( file )
  return creatingURL
}

BufferedURL.toBuffer = toBuffer
BufferedURL.toURL = toURL
