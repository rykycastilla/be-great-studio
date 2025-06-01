import { ModalConfig } from './ModalConfig'
import { ReactElement } from 'react'

export interface ModalContext {
  currentModalId: string | null
  setCurrentModalId( currentModalId:string|null ): void
  setConfig( config:ModalConfig ): void
  setComponentRef<T extends object>( componentRef:ComponentRef<T> ): void
}

interface Component<T extends object> {
  ( props:T ): ReactElement
}

interface ComponentRef<T extends object> {
  Component: Component<T>
  props: T
}
