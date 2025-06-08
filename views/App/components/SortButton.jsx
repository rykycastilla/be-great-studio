import SortIcon from './SortIcon'
import SortModal from './SortModal'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useModal } from '@/contexts/modal'
import { useSort } from '@/contexts/drawing_list'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const SortButton = () => {
  const { colors } = useTheme()
  const [ sort ] = useSort()
  const dispatchSortModal = useModal( 'sort', SortModal, {} )
  return (
    <TouchableOpacity
      style={ [ styles.button, { backgroundColor:colors.card } ] }
      onPress={ dispatchSortModal }>
      <SortIcon sort={ sort } size={ 15 } color={ colors.primary } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default SortButton
