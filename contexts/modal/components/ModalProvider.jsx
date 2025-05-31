import DefaultComponent from './DefaultComponent'
import Modal from './Modal'
import { ModalContext } from '../context'
import { useState } from 'react'

/**
 * @import { ModalConfig } from '../context'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } ModalProviderProps
 * @property { ReactElement } children
 */

/**
 * @param { ModalProviderProps } props
 * @returns { ReactElement }
 */
const ModalProvider = ( props ) => {

  const { children } = props
  const [ isVisible, setIsVisible ] = useState( false )
  const [ config, setConfig ] = useState( /** @type { ModalConfig } */ ( { title:'' } ) )
  const { title, acceptButtonTitle, onAccept } = config

  const [ componentRef, setComponentRef ] = useState(
    { Component:DefaultComponent, props:{} },
  )
  const { Component, props:_props } = componentRef

  return (
    <ModalContext.Provider
      value={
        { isVisible,
          setIsVisible,
          setConfig,
          setComponentRef: /** @type { ModalContext[ 'setComponentRef' ] } */ ( setComponentRef ),
        }
      }>
      { children }
      <Modal
        isVisible={ isVisible }
        title={ title }
        acceptButtonTitle={ acceptButtonTitle }
        onAccept={ onAccept }>
        <Component { ..._props } />
      </Modal>
    </ModalContext.Provider>
  )

}

export default ModalProvider
