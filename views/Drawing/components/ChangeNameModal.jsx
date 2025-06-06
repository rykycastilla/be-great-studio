import Input from '@/components/Input'
import { useModalAction, useModalConfig } from '@/contexts/modal'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ChangeNameModalProps
 * @property { string } defaultName
 * @property { string } name
 * @property { ( name:string ) => void } setName
 * @property { () => void } onAccept
 */

/**
 * @param { ChangeNameModalProps } props
 * @returns { ReactElement }
 */
const ChangeNameModal = ( props ) => {
  const { defaultName, name, setName, onAccept } = props
  useModalConfig(
    { title:'Change name', acceptButtonTitle:'Change', isButtonInactive:( name === '' ) },
  )
  useModalAction( onAccept )
  return <Input defaultValue={ defaultName } setValue={ setName } />
}

export default ChangeNameModal
