// @ts-check

/// <reference path="./NativeBridge.d.ts" />
/// <reference path="./ReactNativeWebView.d.ts" />

/**
 * @namespace NativeBridge
 */
Object.assign( window, { NativeBridge:{} } )

/** @type { Record<string,NativeBridge.CallHandler|undefined> } */ const handlerIndex = {}

/**
 * @param { string } target
 * @param { NativeBridge.CallHandler } handle
 */
function onCall( target, handle ) {
  handlerIndex[ target ] = handle
}

/**
 * @typedef { object } DataPack
 * @property { number } id
 * @property { string } target
 * @property { any } data
 */

/**
 * @param { string } target
 * @param { any } data
 * @returns { Promise<any> }
 */
async function runTask( target, data ) {
  const handle = handlerIndex[ target ]
  if( handle === undefined ) { return }
  return handle( data )
}

/**
 * @param { string } message
 */
async function processMessage( message ) {
  // Receiving
  /** @type { DataPack } */ const dataPack = JSON.parse( message )
  const { id, target, data } = dataPack
  // Resolving
  let response
  try { response = await runTask( target, data ) }
  catch { response = undefined }
  // Sending
  /** @type { DataPack } */ const resDataPack = { id, target, data:response }
  const resMessage = JSON.stringify( resDataPack )
  ReactNativeWebView.postMessage( resMessage )
}

document.addEventListener( 'message', ( event ) => {
  const { data } = /** @type { { data:string } } */ ( /** @type { unknown } */ ( event ) )
  processMessage( data )
} )

export {}
NativeBridge.onCall = onCall
