import OptionItem from './OptionItem'
import WarningModal from './WarningModal'
import { useCallback } from 'react'
import { useDrawingList } from '@/contexts/drawing_list'
import { useModal } from '@/contexts/modal'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const DuplicateOption = () => {

  const dispatchWarningModal = useModal( 'warning', WarningModal, {} )
  const { duplicateDrawing } = useDrawingList()

  const onAccept = useCallback(
    /** @type { ( drawingList:Drawing[] ) => Promise<void> } */
    async( drawingList ) => {
      for( const drawing of drawingList ) {
        await duplicateDrawing( drawing )
      }
    }, [ duplicateDrawing ] )

  const onAction = useCallback(
    /** @type { ( drawingList:Drawing[] ) => void } */
    ( drawingList ) => {
      dispatchWarningModal( 'duplicate', drawingList, onAccept )
    }, [ dispatchWarningModal, onAccept ] )

  return (
    <OptionItem
      name="Duplicate"
      icon="copy-outline"
      onAction={ onAction } />
  )

}

export default DuplicateOption
