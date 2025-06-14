import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

/**
 * @typedef { object } ModalBackgroundProps
 * @property { ReactElement } children
 * @property { boolean } isVisible
 * @property { SharedValue<number> } opacity
 * @property { () => void } onClose
 */

/**
 * @param { ModalBackgroundProps } props
 * @returns { ReactElement }
 */
const ModalBackground = ( props ) => {

  const { children, isVisible, opacity, onClose } = props
  const { theme } = useTheme()
  const actualBlurIntensity = theme === 'dark' ? 80 : 50

  const overlayStyle = useAnimatedStyle( () => {
    return {
      opacity: opacity.value,
    }
  } )

  return (
    <Modal
      transparent
      visible={ isVisible }
      animationType="none"
      onRequestClose={ onClose }
      statusBarTranslucent>
      <Reanimated.View style={ [ styles.overlay, overlayStyle ] }>
        <BlurView
          intensity={ actualBlurIntensity }
          tint={ theme === 'dark' ? 'dark' : 'light' }
          style={ StyleSheet.absoluteFill } />
        <TouchableWithoutFeedback onPress={ onClose }>
          <View style={ StyleSheet.absoluteFill } />
        </TouchableWithoutFeedback>
        { children }
      </Reanimated.View>
    </Modal>
  )

}

const styles = StyleSheet.create( {
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default ModalBackground
