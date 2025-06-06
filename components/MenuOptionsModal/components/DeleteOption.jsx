import DeleteWarningModal from './DeleteWarningModal'
import OptionItem from './OptionItem'
import { useModal } from '@/contexts/modal'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const DeleteOption = () => {
  const dispatchDeleteWarningModal = useModal( 'delete-warning', 'Delete warning', DeleteWarningModal, {}, {} )
  return <OptionItem name="Delete" icon="trash-bin-outline" onAction={ ( drawing ) => dispatchDeleteWarningModal( drawing ) } />
}

export default DeleteOption
