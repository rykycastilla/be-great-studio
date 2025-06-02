import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useBack } from '@/hooks/back'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

/**
 * @typedef { object } WrapperProps
 * @property { ReactElement } children
 * @property { SharedValue<number> } opacity
 * @property { () => void } onClose
 */

/**
 * @param { WrapperProps } props
 * @returns { ReactElement }
 */
const Wrapper = ( props ) => {

  const { children, opacity, onClose } = props
  const { theme } = useTheme()

  useBack( () => {
    onClose()
  } )

  const animatedContainerStyle = useAnimatedStyle( () => {
    return { opacity:opacity.value }
  } )

  return (
    <Animated.View style={ [ styles.container, animatedContainerStyle ] }>
      <TouchableWithoutFeedback onPress={ onClose }>
        <BlurView
          intensity={ ( theme === 'dark' ) ? 400 : 200 }
          tint={ theme === 'dark' ? 'dark' : 'light' }
          style={ StyleSheet.absoluteFill } />
      </TouchableWithoutFeedback>
      { children }
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
  },
} )

export default Wrapper
