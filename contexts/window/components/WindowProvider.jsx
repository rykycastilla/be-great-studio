import { SafeAreaProvider as RNSafeAreaProvider } from 'react-native-safe-area-context'
import { useCallback, useState } from 'react'
import { WindowContext } from '../context'

/**
 * @import { LayoutChangeEvent } from 'react-native'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SafeAreaViewProps
 * @property { ReactElement } children
 * @property { string } backgroundColor
 */

/**
 * @param { SafeAreaViewProps } props
 * @returns { ReactElement }
 */
const WindowProvider = ( props ) => {

  const { children, backgroundColor } = props
  const [ layout, setLayout ] = useState( { width:0, height:0 } )

  const updateLayout = useCallback(
    /** @type { ( event:LayoutChangeEvent ) => void } */
    ( event ) => {
      const { width, height } = event.nativeEvent.layout
      setLayout( { width, height } )
    }, [] )

  return (
    <WindowContext value={ { layout } }>
      <RNSafeAreaProvider style={ { backgroundColor } } onLayout={ updateLayout }>
        { children }
      </RNSafeAreaProvider>
    </WindowContext>
  )

}

export default WindowProvider
