import ScreenTransition from './components/ScreenTransition'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

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
  const { colors } = useTheme()
  return (
    <ScreenTransition>
      <View style={ [ styles.view, { backgroundColor:colors.background }, ...containerStyles ] }>
        { children }
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
