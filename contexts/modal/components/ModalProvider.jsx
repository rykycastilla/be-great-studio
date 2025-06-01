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
  const [ config, setConfig ] = useState( /** @type { ModalConfig } */ ( { title:'' } ) )
  const { title, acceptButtonTitle, isButtonInactive, onAccept } = config

  const [ componentRef, setComponentRef ] = useState(
    { Component:DefaultComponent, props:{} },
  )
  const { Component, props:_props } = componentRef

  // Setting current modal and visibility
  const [ currentModalId, setCurrentModalId ] = useState( /** @type { string | null } */ ( null ) )
  const isVisible = currentModalId !== null

  return (
    <ModalContext.Provider
      value={
        {
          currentModalId,
          setCurrentModalId,
          setConfig,
          setComponentRef: /** @type { ModalContext[ 'setComponentRef' ] } */ ( setComponentRef ),
        }
      }>
      { children }
      <Modal
        isVisible={ isVisible }
        title={ title }
        acceptButtonTitle={ acceptButtonTitle }
        isButtonInactive={ isButtonInactive }
        onAccept={ onAccept }>
        <Component { ..._props } />
      </Modal>
    </ModalContext.Provider>
  )

}

export default ModalProvider
