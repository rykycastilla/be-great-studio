import { ModalContext } from '../context'
import { useContext, useEffect } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

/**
 * @param { () => void } onAction
 */
export function useModalAction( onAction ) {
  const { setActionRef } = useContext( ModalContext )
  const onActionStatic = useStaticCallback( onAction )
  useEffect( () => {
    const current = onActionStatic
    setActionRef( { current } )
    return () => setActionRef( {} )
  }, [ onActionStatic, setActionRef ] )
}
