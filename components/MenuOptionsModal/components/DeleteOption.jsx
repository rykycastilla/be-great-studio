import WarningModal from './WarningModal'
import OptionItem from './OptionItem'
import { useCallback } from 'react'
import { useDrawingList } from '@/contexts/drawing_list'
import { useLanguage } from '@/contexts/language'
import { useModal } from '@/contexts/modal'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const DeleteOption = () => {

  const dispatchWarningModal = useModal( 'warning', WarningModal, {} )
  const { removeDrawing } = useDrawingList()
  const { t } = useLanguage()

  const onAccept = useCallback(
    /** @type { ( drawingList:Drawing[] ) => Promise<void> } */
    async( drawingList ) => {
      for( const drawing of drawingList ) {
        await removeDrawing( drawing )
      }
    }, [ removeDrawing ] )

  const onAction = useCallback(
    /** @type { ( drawingList:Drawing[] ) => void } */
    ( drawingList ) => {
      dispatchWarningModal( t( 'warning-action-delete' ), drawingList, onAccept )
    }, [ dispatchWarningModal, onAccept, t ] )

  return (
    <OptionItem
      name={ t( 'delete' ) }
      icon="trash-bin-outline"
      onAction={ onAction } />
  )

}

export default DeleteOption
