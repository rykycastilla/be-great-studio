import Reanimated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { Image, StyleSheet, View } from 'react-native'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useTheme } from '@/contexts/theme'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

const AnimatedView = Reanimated.createAnimatedComponent( View )

/**
 * @typedef { object } ItemPreviewProps
 * @property { Drawing } drawing
 * @property { SharedValue<number> } scale
 * @property { SharedValue<number> } opacity
 */

/**
 * @param { ItemPreviewProps } props
 * @returns { ReactElement }
 */
const ItemPreview = ( props ) => {
  const { drawing, scale, opacity } = props
  const { thumbnail } = drawing
  const { colors, theme } = useTheme()

  const previewAnimatedStyle = useAnimatedStyle( () => {
    return { transform:[ { scale:scale.value } ], opacity:opacity.value }
  } )

  const blurAnimatedStyle = useAnimatedStyle( () => {
    return { opacity:opacity.value }
  } )

  return (
    <View style={ styles.overlay }>
      <AnimatedView style={ [ styles.blurContainer, blurAnimatedStyle ] }>
        <BlurView
          intensity={ ( theme === 'dark' ) ? 400 : 200 }
          tint={ theme === 'dark' ? 'dark' : 'light' }
          style={ styles.blur } />
      </AnimatedView>
      <AnimatedView style={ [ styles.content, { backgroundColor:colors.canvas }, previewAnimatedStyle ] }>
        <View style={ [ styles.imageContainer ] }>
          <Image src={ thumbnail } width={ 300 } height={ 300 } />
        </View>
      </AnimatedView>
    </View>
  )
}

const styles = StyleSheet.create( {

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },

  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    padding: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },

  date: {
    fontSize: 14,
  },

} )

export default ItemPreview
