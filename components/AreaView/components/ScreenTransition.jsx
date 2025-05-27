import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolate } from 'react-native-reanimated'
import { useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

const { width } = Dimensions.get( 'window' )

/**
 * @typedef { Object } ScreenTransitionProps
 * @property { ReactElement[] | ReactElement } children
 */

/**
 * @param { ScreenTransitionProps } props
 * @returns { ReactElement }
 */
const ScreenTransition = ( props ) => {
  const { children } = props
  const progress = useSharedValue( 0 )

  useEffect( () => {
    progress.value = withTiming( 1, {
      duration: 250,
      easing: Easing.bezier( 0.25, 0.1, 0.25, 1 ),
    } )
  }, [ progress ] )

  const animatedStyle = useAnimatedStyle( () => {
    // To enter, the page comes from right
    // To leave, the page goes to right
    const translateX = interpolate( progress.value, [ 0, 1 ], [ width, 0 ], Extrapolate.CLAMP )

    // Opacity effect
    const opacity = interpolate( progress.value, [ 0, 0.7, 1 ], [ 0, 0.7, 1 ], Extrapolate.CLAMP )

    // Scale effect to use depth
    const scale = interpolate( progress.value, [ 0, 1 ], [ 0.95, 1 ], Extrapolate.CLAMP )

    return {
      transform: [ { translateX }, { scale } ],
      opacity,
    }
  } )

  return (
    <Animated.View style={ [ styles.container, animatedStyle ] }>
      { children }
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
} )

export default ScreenTransition
