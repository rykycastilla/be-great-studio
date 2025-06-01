import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

const { height } = Dimensions.get( 'window' )

/**
 * @typedef { Object } AnimatedModalProps
 * @property { boolean } visible
 * @property { ReactElement } children
 * @property { () => void } onClose
 */

/**
 * @param { AnimatedModalProps } props
*/
const AnimatedModal = ( props ) => {
  const { visible, onClose, children } = props
  const { theme } = useTheme()
  const translateY = useSharedValue( height )
  const opacity = useSharedValue( 0 )
  const [ isVisible, setIsVisible ] = useState( visible )

  useEffect( () => {
    if( visible ) {
      setIsVisible( true )
      opacity.value = withTiming( 1, { duration: 180 } )
      translateY.value = withSpring( 0, {
        damping: 25,
        stiffness: 120,
        mass: 0.8,
      } )
    }
    else {
      translateY.value = withTiming( height, { duration: 180 }, () => {
        runOnJS( fadeOutBackground )()
      } )
    }
  }, [ visible ] )  // eslint-disable-line

  const fadeOutBackground = () => {
    opacity.value = withTiming( 0, { duration: 150 }, () => {
      runOnJS( setIsVisible )( false )
    } )
  }

  const animatedContainerStyle = useAnimatedStyle( () => {
    return {
      opacity: opacity.value,
    }
  } )

  const animatedModalStyle = useAnimatedStyle( () => {
    return {
      transform: [ { translateY:translateY.value } ],
    }
  } )

  if ( !isVisible ) return null

  return (
    <Modal transparent visible={ isVisible } animationType="none" onRequestClose={ onClose } statusBarTranslucent>
      <Animated.View style={ [ styles.container, animatedContainerStyle ] }>
        <BlurView
          intensity={ ( theme === 'dark' ) ? 400 : 200 }
          tint={ theme === 'dark' ? 'dark' : 'light' }
          style={ StyleSheet.absoluteFill } />
        <TouchableWithoutFeedback onPress={ onClose }>
          <View style={ styles.backdrop } />
        </TouchableWithoutFeedback>
        <Animated.View style={ [ styles.modalContent, animatedModalStyle ] }>
          { children }
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create( {

  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },

} )

export default AnimatedModal
