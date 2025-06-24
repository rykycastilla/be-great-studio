import { useCallback, useRef } from 'react'

/**
 * @import { MessageDriver } from './MessageDriver'
 * @import { RefObject } from 'react'
 * @import { WebView, WebViewMessageEvent } from 'react-native-webview'
 */

/**
 * @typedef { object } DriverBridge
 * @property { RefObject<WebView|null> } ref
 * @property { () => void } onLoad
 * @property { ( event:WebViewMessageEvent ) => void } onMessage
 */

/**
 * @param { MessageDriver } driver
 * @returns { DriverBridge }
 */
export function useDriver( driver ) {

  const ref = useRef( /** @type { WebView | null } */ ( null ) )

  /** @type { ( event:WebViewMessageEvent ) => void } */
  const onMessage = useCallback( ( event ) => {
    if( driver.onmessage === null ) { return }
    driver.onmessage( event.nativeEvent.data )
  }, [ driver ] )

  const onLoad = useCallback( () => {
    const webView = ref.current
    if( webView === null ) { return }
    driver.setSender( ( message ) => webView.postMessage( message ) )
  }, [ ref, driver ] )

  return{ ref, onLoad, onMessage }

}
