import DefaultComponent from './DefaultComponent'
import Modal from './Modal'
import { ModalContext } from '../context'
import { useCallback, useState } from 'react'

/**
 * @import { ActionRef, ModalConfig } from '../context'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ModalProviderProps
 * @property { ReactElement | ReactElement[] } children
 */

/**
 * @param { ModalProviderProps } props
 * @returns { ReactElement }
 */
const ModalProvider = ( props ) => {

  const { children } = props
  const [ config, setConfig ] = useState( /** @type { ModalConfig } */ ( { title:'' } ) )
  const { title, acceptButtonTitle, isButtonInactive, hideButtons } = config
  const [ modalArgs, setModalArgs ] = useState(
    /** @type { unknown[] } */ ( /** @type { unknown } */ ( undefined ) ),
  )
  const [ actionRef, setActionRef ] = useState( /** @type { ActionRef } */ ( {} ) )

  const onAccept = useCallback( () => {
    const runHookAction = actionRef.current
    if( runHookAction !== undefined ) { runHookAction() }
  }, [ actionRef ] )

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
          modalArgs,
          setModalArgs,
          setActionRef,
        }
      }>
      { children }
      <Modal
        isVisible={ isVisible }
        title={ title }
        acceptButtonTitle={ acceptButtonTitle }
        isButtonInactive={ isButtonInactive }
        hideButtons={ hideButtons }
        onAccept={ onAccept }>
        <Component { ..._props } />
      </Modal>
    </ModalContext.Provider>
  )

}

export default ModalProvider
