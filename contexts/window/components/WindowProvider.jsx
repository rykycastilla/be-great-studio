import { SafeAreaProvider as RNSafeAreaProvider } from 'react-native-safe-area-context'

/**
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
  return (
    <RNSafeAreaProvider style={ { backgroundColor } }>
      { children }
    </RNSafeAreaProvider>
  )
}

export default WindowProvider
