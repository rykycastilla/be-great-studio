import { ModalContext } from '../context'
import { useContext, useEffect } from 'react'

/**
 * @import { ModalConfig } from '../context'
 */

/**
 * @param { ModalConfig } config
 */
export function useModalConfig( config ) {
  const { title, acceptButtonTitle, isButtonInactive, hideButtons } = config
  const { setConfig } = useContext( ModalContext )
  useEffect( () => {
    setConfig( { title, acceptButtonTitle, isButtonInactive, hideButtons } )
    return () => setConfig( { title:'' } )
  }, [ setConfig, title, acceptButtonTitle, isButtonInactive, hideButtons ] )
}
