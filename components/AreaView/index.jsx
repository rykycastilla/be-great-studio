import SafeContainer from './components/SafeContainer'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/**
 * @import { ReactElement, ReactNode } from 'react'
 * @import { ViewProps } from 'react-native'
 */

/**
 * @typedef { object } AreaViewProps
 * @property { ReactNode } [ children ]
 * @property { ViewProps[ 'style' ] } [ style ]
 */

/**
 * @param { AreaViewProps } props
 * @retruns { ReactElement }
 */
const AreaView = ( props ) => {
  const { children, style } = props
  const containerStyles = ( style instanceof Array ) ? style : [ style ]
  const { top, left, right, bottom } = useSafeAreaInsets()
  const layout = { top, left, right, bottom }
  return (
    <SafeContainer layout={ layout }>
      <View style={ [ styles.view, ...containerStyles ] }>
        { children }
      </View>
    </SafeContainer>
  )
}

const styles = StyleSheet.create( {
  view: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
} )

export default AreaView
