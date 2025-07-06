import { StyleSheet } from 'react-native'
import { useDriver } from './driver'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

/**
 * @import { MessageDriver } from './MessageDriver'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } OffscreenBrowserProps
 * @property { MessageDriver } driver
 */

/**
 * @param { OffscreenBrowserProps } props
 * @returns { ReactElement }
 */
const OffscreenBrowser = ( props ) => {

  const { driver } = props
  const bridge = useDriver( driver )
  /** @type { false } */ const DEBUG = true

  return (
    <View style={ styles.offscreenBrowser }>
      <WebView webviewDebuggingEnabled={ DEBUG }
        { ...bridge }
        source={ {
          html: driver.setupScripts.map( ( script ) => {
            return `<script type="module">${ script }</script>`
          } ).join( '\n' ),
        } } />
    </View>
  )
}

const styles = StyleSheet.create( {
  offscreenBrowser: {
    display: 'none',
  },
} )

export default OffscreenBrowser
