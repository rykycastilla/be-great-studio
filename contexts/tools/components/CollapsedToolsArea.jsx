import Ionicons from '@/components/Ionicons'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

const AnimatedView = Reanimated.createAnimatedComponent( View )

/**
 * @typedef { object } CollapsedToolsAreaProps
 * @property { SharedValue<number> } opacity
 * @property { SharedValue<number> } scale
 * @property { SharedValue<number> } translateY
 * @property { () => void } onShowToolsArea
 */

/**
 * @param { CollapsedToolsAreaProps } props
 * @returns { ReactElement }
 */
const CollpasedToolsArea = ( props ) => {

  const { opacity, scale, translateY, onShowToolsArea:handleShowToolsArea } = props
  const { colors, theme } = useTheme()

  const collapsedToolbarAnimatedStyle = useAnimatedStyle( () => {
    return {
      opacity: opacity.value,
      transform: [ { scale:scale.value }, { translateY:translateY.value } ],
      display: opacity.value === 0 ? 'none' : 'flex',
    }
  } )

  return (
    <AnimatedView
      style={ [
        styles.collapsedToolsContainer,
        {
          backgroundColor: colors.card,
          shadowColor: theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
        },
        collapsedToolbarAnimatedStyle,
      ] }>
      <TouchableOpacity
        style={ styles.collapsedToolsButton }
        onPress={ handleShowToolsArea }
        activeOpacity={ 0.7 }>
        <Ionicons name="ellipsis-horizontal" size={ 24 } color={ colors.text } />
      </TouchableOpacity>
    </AnimatedView>
  )

}

const styles = StyleSheet.create( {

  collapsedToolsContainer: {
    width: 60,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 110,
  },

  collapsedToolsButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

} )

export default CollpasedToolsArea
