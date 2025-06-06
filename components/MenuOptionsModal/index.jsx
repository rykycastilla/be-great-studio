import DeleteOption from './components/DeleteOption'
import RenameOption from './components/RenameOption'
import { useSelectionMode } from '@/contexts/drawing_list'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const MenuOptionsModal = () => {
  const { selectionList } = useSelectionMode()
  return (
    <>
      <DeleteOption />
      <RenameOption hidden={ selectionList.size !== 1 } />
    </>
  )
}

export default MenuOptionsModal
