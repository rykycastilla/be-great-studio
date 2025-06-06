import DeleteWarningModal from './DeleteWarningModal'
import OptionItem from './OptionItem'
import { useModal } from '@/contexts/modal'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const DeleteOption = () => {
  const dispatchDeleteWarningModal = useModal( 'delete-warning', DeleteWarningModal, {} )
  return (
    <OptionItem name="Delete" icon="trash-bin-outline" onAction={ dispatchDeleteWarningModal } />
  )

}

export default DeleteOption
