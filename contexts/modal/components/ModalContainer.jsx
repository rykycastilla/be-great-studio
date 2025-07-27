import Card from './Card'
import Wrapper from './Wrapper'
import { useDimensions } from '@/contexts/window'
import { useEffect, useState } from 'react'
import { useSharedValue, withTiming, withSpring, runOnJS } from 'react-native-reanimated'

/**
 * @import { ReactNode } from 'react'
 */

/**
 * @typedef { object } ModalContainerProps
 * @property { boolean } visible
 * @property { ReactNode } children
 * @property { () => void } onClose
 */

/**
 * @param { ModalContainerProps } props
 */
const ModalContainer = ( props ) => {
  const { visible, onClose, children } = props
  const { height } = useDimensions()
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

  if ( !isVisible ) return null

  return (
    <Wrapper opacity={ opacity } onClose={ onClose }>
      <Card translateY={ translateY }>{ children }</Card>
    </Wrapper>
  )
}

export default ModalContainer
