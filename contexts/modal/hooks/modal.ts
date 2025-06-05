import { ModalContext } from '../context'
import { ReactElement, useCallback, useContext, useEffect, useId, useMemo, useState } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

type Props<T extends object, U extends unknown[]> = T & { args:U }
type Component<T extends object, U extends unknown[]> = ( props:Props<T,U> ) => ReactElement

interface ModalConfig {
  acceptButtonTitle?: string
  isButtonInactive?: boolean
  hideButtons?: boolean
  onAccept?: () => void
}

export function useModal<T extends object,U extends unknown[]>(
  title: string,
  Component: Component<T,U>,
  componentProps: T,
  config: ModalConfig,
): ( ...args:U ) => void
{
  const { currentModalId, setCurrentModalId, setConfig, setComponentRef } = useContext( ModalContext )
  const { acceptButtonTitle, isButtonInactive, hideButtons, onAccept = () => {} } = config ?? {}
  const onAcceptStatic = useStaticCallback( onAccept )
  const id = useId()
  const [ args, setArgs ] = useState( undefined as unknown as U )

  const props = useMemo( (): Props<T,U> => {
    return { ...props, args }
  }, [ JSON.stringify( componentProps ), args ] )  // eslint-disable-line

  // Using modal config
  useEffect( () => {
    if( id !== currentModalId ) { return }
    const config = { title, acceptButtonTitle, isButtonInactive, hideButtons, onAccept:onAcceptStatic }
    setConfig( config )
  }, [ id, currentModalId, setConfig, title, acceptButtonTitle, isButtonInactive, hideButtons, onAcceptStatic ] )

  // Using modal props
  useEffect( () => {
    if( id !== currentModalId ) { return }
    const componentRef = { Component, props }
    setComponentRef( componentRef )
  }, [ id, currentModalId, Component, props, args, setComponentRef ] )

  // Activating this modal
  return useCallback( ( ...args:U ) => {
    setArgs( args )
    setCurrentModalId( id )
  }, [ id, setArgs, setCurrentModalId ] )

}
