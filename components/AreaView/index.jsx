import ScreenTransition from './components/ScreenTransition'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/contexts/theme/index'

/**
 * @import { ReactElement } from 'react'
 * @import { ViewProps } from 'react-native'
 */

/**
 * @typedef { Object } AreaViewProps
 * @property { ReactElement[] | ReactElement } [ children ]
 * @property { ViewProps[ 'style' ] } [ style ]
 */

/**
 * @param { AreaViewProps } props
 * @retruns { ReactElement }
 */
const AreaView = ( props ) => {
  const { children, style } = props
  const containerStyles = ( style instanceof Array ) ? style : [ style ]
  const { colors } = useTheme()
  const { top, left, right, bottom } = useSafeAreaInsets()
  return (
    <ScreenTransition>
      <View style={ [ styles.view, { backgroundColor:colors.background } ] }>
        <View style={
          [
            { marginTop:top, marginLeft:left, marginRight:right, marginBottom:bottom },
            ...containerStyles,
          ]
        }>
          { children }
        </View>
      </View>
    </ScreenTransition>
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
