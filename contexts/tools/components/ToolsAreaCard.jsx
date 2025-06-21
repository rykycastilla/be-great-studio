import ColorButton from './ColorButton'
import EyeDropperButton from './EyeDropperButton'
import HistoryButtons from './HistoryButtons'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import SizeControlRow from './SizeControlRow'
import ToolsButton from './ToolsButton'
import ZoomButton from './ZoomButton'
import { Animated, StyleSheet, View } from 'react-native'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

const AnimatedView = Reanimated.createAnimatedComponent( View )

/**
 * @typedef { object } ToolsAreaCardProps
 * @property { SharedValue<number> } opacity
 * @property { SharedValue<number> } scale
 * @property { SharedValue<number> } translateY
 * @property { ( color:string ) => void } dispatchColorPicker
 */

/**
 * @param { ToolsAreaCardProps } props
 * @returns { ReactElement }
 */
const ToolsAreaCard = ( props ) => {

  const { opacity, scale, translateY, dispatchColorPicker } = props
  const { theme, colors } = useTheme()
  const fadeAnim = useRef( new Animated.Value( 0 ) ).current

  const toolbarAnimatedStyle = useAnimatedStyle( () => {
    return {
      opacity: opacity.value,
      transform: [ { scale:scale.value }, { translateY:translateY.value }],
      display: opacity.value === 0 ? 'none' : 'flex',
    }
  } )

  useEffect( () => {
    Animated.timing( fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    } ).start()
  }, [ fadeAnim ] )

  return (
    <AnimatedView
      style={ [
        styles.toolsContainer,
        {
          backgroundColor: colors.card,
          shadowColor: theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
        },
        toolbarAnimatedStyle,
      ] }>
      <Animated.View style={ { opacity:fadeAnim } }>
        <SizeControlRow />
        <View style={ styles.toolsRow }>
          <ToolsButton />
          <ColorButton dispatchColorPicker={ dispatchColorPicker } />
          <EyeDropperButton />
          <ZoomButton />
          <HistoryButtons />
        </View>
      </Animated.View>
    </AnimatedView>

  )
}

const styles = StyleSheet.create( {

  toolsContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 110,
  },

  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

} )

export default ToolsAreaCard
