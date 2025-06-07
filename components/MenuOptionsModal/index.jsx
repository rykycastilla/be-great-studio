import DeleteOption from './components/DeleteOption'
import DuplicateOption from './components/DuplicateOption'
import RenameOption from './components/RenameOption'
import { useModalConfig } from '@/contexts/modal'
import { useSelectionMode } from '@/contexts/drawing_list'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const MenuOptionsModal = () => {
  const { selectionList } = useSelectionMode()
  useModalConfig( { title:'Select an option', hideButtons:true } )
  return (
    <>
      <DeleteOption />
      <RenameOption hidden={ selectionList.size !== 1 } />
      <DuplicateOption />
    </>
  )
}

export default MenuOptionsModal
