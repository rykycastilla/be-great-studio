import OptionItem from './OptionItem'
import WarningModal from './WarningModal'
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
const DuplicateOption = () => {

  const dispatchWarningModal = useModal( 'warning', WarningModal, {} )
  const { duplicateDrawing } = useDrawingList()
  const { t } = useLanguage()

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
      dispatchWarningModal( t( 'warning-action-duplicate' ), drawingList, onAccept )
    }, [ dispatchWarningModal, onAccept, t ] )

  return (
    <OptionItem
      name={ t( 'duplicate' ) }
      icon="copy-outline"
      onAction={ onAction } />
  )

}

export default DuplicateOption
