import { ModalContext } from '../context'
import { useCallback, useContext } from 'react'

/**
 * @returns { () => void }
 */
export function useModalHider() {
  const { setCurrentModalId } = useContext( ModalContext )
  return useCallback( () => {
    setCurrentModalId( null )
  }, [ setCurrentModalId ] )
}
