import { ModalContext } from '../context'
import { ReactElement, useCallback, useContext, useEffect, useMemo } from 'react'

type Props<T extends object, U extends unknown[]> = T & { args:U }
type Component<T extends object, U extends unknown[]> = ( props:Props<T,U> ) => ReactElement

export function useModal<T extends object,U extends unknown[]>( id:string, Component:Component<T,U>, componentProps:T ): ( ...args:U ) => void {

  const {
    currentModalId, setCurrentModalId, setComponentRef, modalArgs, setModalArgs:setArgs,
  } = useContext( ModalContext )

  const args = modalArgs as U

  const props = useMemo( (): Props<T,U> => {
    return { ...props, args }
  }, [ JSON.stringify( componentProps ), args ] )  // eslint-disable-line

  // Using modal props
  useEffect( () => {
    if( id !== currentModalId ) { return }
    const componentRef = { Component, props }
    setComponentRef( componentRef )
  }, [ id, currentModalId, Component, props, setComponentRef ] )

  // Activating this modal
  return useCallback( ( ...args:U ) => {
    setArgs( args )
    setCurrentModalId( id )
  }, [ id, setArgs, setCurrentModalId ] )

}
