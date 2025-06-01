import { ModalContext } from '../context'
import { useCallback, useContext, useEffect, useId, useMemo } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @template { object } T
 * @callback Component
 * @param { T } props
 * @returns { ReactElement }
 */

/**
 * @typedef { object } ModalConfig
 * @property { string } [ acceptButtonTitle ]
 * @property { boolean } [ isButtonInactive ]
 * @property { () => void }  [ onAccept ]
 */

/**
 * @template { object } T
 * @param { string } title
 * @param { Component<T> } Component
 * @param { T } props
 * @param { ModalConfig } config
 * @returns { () => void }
 */
export function useModal( title, Component, props, config ) {

  const { currentModalId, setCurrentModalId, setConfig, setComponentRef } = useContext( ModalContext )
  const { acceptButtonTitle, isButtonInactive, onAccept = () => {} } = config ?? {}
  const onAcceptStatic = useStaticCallback( onAccept )
  const id = useId()

  const fixedProps = useMemo( () => {
    return props
  }, [ JSON.stringify( props ) ] )  // eslint-disable-line

  // Using modal props and config
  useEffect( () => {
    if( id !== currentModalId ) { return }
    setConfig( { title, acceptButtonTitle, isButtonInactive, onAccept:onAcceptStatic } )
    const componentRef = { Component, props:fixedProps }
    setComponentRef( componentRef )
  }, [ id, currentModalId, title, acceptButtonTitle, isButtonInactive, onAcceptStatic, setConfig, Component, fixedProps, setComponentRef ] )

  // Activating this modal
  return useCallback( () => {
    setCurrentModalId( id )
  }, [ id, setCurrentModalId ] )

}
