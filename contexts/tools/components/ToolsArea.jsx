import ColorButton from './ColorButton'
import HistoryButtons from './HistoryButtons'
import Reanimated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import SizeControlRow from './SizeControlRow'
import ToolsButton from './ToolsButton'
import { Animated, StyleSheet, View } from 'react-native'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

const AnimatedView = Reanimated.createAnimatedComponent( View )

/**
 * @returns { ReactElement }
 */
const ToolsArea = () => {

  const { theme, colors } = useTheme()
  const fadeAnim = useRef( new Animated.Value( 0 ) ).current
  const toolbarOpacity = useSharedValue( 1 )
  const toolbarScale = useSharedValue( 1 )
  const toolbarTranslateY = useSharedValue( 0 )

  const toolbarAnimatedStyle = useAnimatedStyle( () => {
    return {
      opacity: toolbarOpacity.value,
      transform: [ { scale:toolbarScale.value }, { translateY:toolbarTranslateY.value }],
      display: toolbarOpacity.value === 0 ? 'none' : 'flex',
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
    <View style={ styles.toolsContainerWrapper }>
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
            <ColorButton />
            <HistoryButtons />
          </View>
        </Animated.View>
      </AnimatedView>
    </View>

  )
}

const styles = StyleSheet.create( {

  toolsContainerWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 100,
  },

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

export default ToolsArea
