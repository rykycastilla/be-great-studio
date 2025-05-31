import { ModalContext } from '../context'
import { useCallback, useContext } from 'react'

/**
 * @returns { () => void }
 */
export function useModalHider() {
  const { setIsVisible } = useContext( ModalContext )
  return useCallback( () => {
    setIsVisible( false )
  }, [ setIsVisible ] )
}
