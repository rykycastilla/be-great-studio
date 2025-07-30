import { TouchContext } from '../context'
import { useContext, useEffect } from 'react'

/**
 * @param { number } size
 */
export function useTouchIndicatorSize( size ) {
  const { setTouchSize } = useContext( TouchContext )
  useEffect( () => {
    setTouchSize( size )
  }, [ setTouchSize, size ] )
}
