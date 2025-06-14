import { useEffect, useState } from 'react'
import { runOnJS, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

/**
 * @import { SharedValue } from 'react-native-reanimated'
 */

/**
 * @typedef { object } ModalAnimationsUtils
 * @property { SharedValue<number> } scale
 * @property { SharedValue<number> } opacity
 * @property { boolean } shouldRender
 */

/**
 * @param { boolean } visible
 * @returns { ModalAnimationsUtils }
 */
export function useModalAnimations( visible ) {

  const [ shouldRender, setShouldRender ] = useState( visible )
  const scale = useSharedValue( 0.9 )
  const opacity = useSharedValue( 0 )

  // Handling animations and modal render
  useEffect( () => {
    if( visible ) {
      setShouldRender( true )
      opacity.value = withTiming( 1, { duration: 180 } )
      scale.value = withSpring( 1, { damping: 20, stiffness: 120, mass: 0.8 } )
    } else {
      scale.value = withTiming( 0.9, { duration: 150 } )
      opacity.value = withTiming( 0, { duration: 180 }, () => {
        runOnJS( setShouldRender )( false )
      } )
    }
  }, [ visible ] )  // eslint-disable-line

  return { shouldRender, scale, opacity }

}
