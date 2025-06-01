import { useCallback, useEffect, useRef } from 'react'

type AnyFunction = ( ...args:any[] ) => any

export function useStaticCallback<T extends AnyFunction>( callback:T ): T {

  const callbackRef = useRef<T|null>( null )

  useEffect( () => {
    callbackRef.current = callback
  }, [ callbackRef, callback ] )

  return useCallback( ( ...args:Parameters<T> ): ReturnType<T> => {
    const callback: T = callbackRef.current!
    return callback( ...args )
  }, [ callbackRef ] ) as T

}
