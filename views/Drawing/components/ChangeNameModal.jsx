import Input from '@/components/Input'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ChangeNameModalProps
 * @property { string } defaultName
 * @property { ( name:string ) => void } setName
 */

/**
 * @param { ChangeNameModalProps } props
 * @returns { ReactElement }
 */
const ChangeNameModal = ( props ) => {
  const { defaultName, setName } = props
  return <Input defaultValue={ defaultName } setValue={ setName } />
}

export default ChangeNameModal
