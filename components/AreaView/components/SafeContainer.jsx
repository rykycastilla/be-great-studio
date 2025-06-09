import { StyleSheet, View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SafeContainerProps
 * @property { ReactElement } children
 * @property { object } layout
 */

/**
 * @param { SafeContainerProps } props
 * @returns { ReactElement }
 */
const SafeContainer = ( props ) => {
  const { children, layout } = props
  return (
    <View style={ [ styles.container, layout ] }>
      { children }
    </View>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    position: 'absolute',
  },
} )

export default SafeContainer
