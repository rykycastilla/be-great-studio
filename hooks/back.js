import { BackHandler } from 'react-native'
import { useEffect } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

/**
 * Uses a custom action for back button pressing
 * @param { () => ( void | boolean ) } backHandler  Custom action executed when back button is pressed.
 * Use `return true` if you want to keep the previous back action without overwrite it
 */
export function useBack( backHandler ) {

  const backHandlerStatic = useStaticCallback( backHandler )

  useEffect( () => {
    const handler = BackHandler.addEventListener( 'hardwareBackPress', () => {
      const goBack = backHandlerStatic()
      return !goBack
    } )

    return () => handler.remove()
  }, [ backHandlerStatic ] )

}
