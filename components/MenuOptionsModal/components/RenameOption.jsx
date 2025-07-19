import OptionItem from './OptionItem'
import RenamingModal from './RenamingModal'
import { useLanguage } from '@/contexts/language'
import { useModal } from '@/contexts/modal'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } RenameOptionProps
 * @property { boolean } hidden
 */

/**
 * @param { RenameOptionProps } props
 * @returns { ReactElement }
 */
const RenameOption = ( props ) => {
  const { hidden } = props
  const dispatchRenamingModal = useModal( 'renaming', RenamingModal, {} )
  const { t } = useLanguage()
  return (
    <OptionItem
      name={ t( 'rename' ) }
      icon="pencil-outline"
      hidden={ hidden }
      onAction={ dispatchRenamingModal } />
  )
}

export default RenameOption
