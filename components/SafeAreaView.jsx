import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SafeAreaContainerProps
 * @property { ReactElement } children
 */

/**
 * @param { SafeAreaContainerProps } props
 * @returns { ReactElement }
 */
const SafeAreaContainer = ( props ) => {
  const { children } = props
  const { top, left, right, bottom } = useSafeAreaInsets()
  return (
    <View style={ { marginTop:top, marginLeft:left, marginRight:right, marginBottom:bottom, flex:1 } }>
      { children }
    </View>
  )
}

/**
 * @typedef { object } SafeAreaViewProps
 * @property { ReactElement } children
 * @property { string } backgroundColor
 */

/**
 * @param { SafeAreaViewProps } props
 * @returns { ReactElement }
 */
const SafeAreaView = ( props ) => {
  const { children, backgroundColor } = props
  return (
    <SafeAreaProvider style={ { backgroundColor } }>
      <SafeAreaContainer>
        { children }
      </SafeAreaContainer>
    </SafeAreaProvider>
  )
}

export default SafeAreaView
