import { useStaticCallback } from '@/hooks/static_callback'
import { Vibration } from 'react-native'

type AnyFunction = ( ...args:any[] ) => any

/**
 * Takes a callback and include vibration capabilities in its execution to be used on long pressing
 * @param callback
 * @returns  A callback prepared for long pressing
 */
export function useLongCallback<T extends AnyFunction>( callback:T ): T {
  const callbackStatic = useStaticCallback( ( ...args:any[] ) => {
    Vibration.vibrate( 50 )
    return callback( ...args )
  } )
  return callbackStatic as T
}
