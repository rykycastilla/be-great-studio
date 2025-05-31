import { ModalContext } from '../context'
import { useCallback, useContext, useMemo } from 'react'

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
 * @typedef { Object } ModalConfig
 * @property { string } [ acceptButtonTitle ]
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

  const { setIsVisible, setConfig, setComponentRef } = useContext( ModalContext )
  const { acceptButtonTitle, onAccept } = config ?? {}

  const fixedProps = useMemo( () => {
    return props
  }, [ JSON.stringify( props ) ] )  // eslint-disable-line

  return useCallback( () => {
    const config = { title, acceptButtonTitle, onAccept }
    const componentRef = { Component, props:fixedProps }
    setIsVisible( true )
    setConfig( config )
    setComponentRef( componentRef )
  }, [ title, Component, fixedProps, acceptButtonTitle, onAccept, setIsVisible, setConfig, setComponentRef ] )

}
