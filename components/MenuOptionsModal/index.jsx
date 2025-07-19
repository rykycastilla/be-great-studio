import DeleteOption from './components/DeleteOption'
import DuplicateOption from './components/DuplicateOption'
import RenameOption from './components/RenameOption'
import ShareOption from './components/ShareOption'
import { useLanguage } from '@/contexts/language'
import { useModalConfig } from '@/contexts/modal'
import { useSelectionMode } from '@/contexts/drawing_list'
import { useSharingInfo } from '@/contexts/sharing_info'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const MenuOptionsModal = () => {
  const { selectionList } = useSelectionMode()
  const { t } = useLanguage()
  useModalConfig( { title:t( 'select-option' ), hideButtons:true } )
  const sharing = useSharingInfo()
  return (
    <>
      <ShareOption hidden={ !sharing.isAvailable } />
      <DeleteOption />
      <RenameOption hidden={ selectionList.size > 1 } />
      <DuplicateOption />
    </>
  )
}

export default MenuOptionsModal
