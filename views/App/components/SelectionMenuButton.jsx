import MenuOptionsModal from '@/components/MenuOptionsModal'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useModal } from '@/contexts/modal'
import { useSelectionMode } from '@/contexts/drawing_list'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const SelectionMenuButton = () => {
  const { colors } = useTheme()
  const dispatchMenuOptionModal = useModal( 'option-menu-select', MenuOptionsModal, {} )
  const { selectionList } = useSelectionMode()
  const enabled = selectionList.size > 0
  return (
    <TouchableOpacity
      disabled={ !enabled }
      style={ styles.button }
      onPress={ dispatchMenuOptionModal }>
      <Ionicons name="menu" size={ 24 } color={ enabled ? colors.primary : colors.inactive } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default SelectionMenuButton
