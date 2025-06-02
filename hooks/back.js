import { BackHandler } from 'react-native'
import { useEffect } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

/**
 * Uses a custom action for back button pressing
 * @param { () => void } backHandler
 */
export function useBack( backHandler ) {

  const backHandlerStatic = useStaticCallback( backHandler )

  useEffect( () => {
    const handler = BackHandler.addEventListener( 'hardwareBackPress', () => {
      backHandlerStatic()
      return true
    } )

    return () => handler.remove()
  }, [ backHandlerStatic ] )

}
