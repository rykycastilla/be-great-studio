import { DebouncedRouter } from '../services/DebouncedRouter'
import { DebouncedRouterContext } from '../context'
import { STACK_ANIMATION_DURATION } from '../constants'
import { useContext } from 'react'
import { useFocusEffect } from 'expo-router'

/**
 * Custom hook to unlock the Router when the screen gains focus.
 */
export function useFocus() {
  const { router } = useContext( DebouncedRouterContext )
  useFocusEffect( () => {
    // Waiting for page animation to allow navigation again
    const timer = setTimeout( () => DebouncedRouter.unlock( router ), STACK_ANIMATION_DURATION )
    return () => clearTimeout( timer )
  } )
}
