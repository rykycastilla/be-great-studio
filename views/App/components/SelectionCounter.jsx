import { StyleSheet, Text, View } from 'react-native'
import { useSelectionMode } from '@/contexts/drawing_list'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement | null }
 */
const SelectionCounter = () => {

  const { colors } = useTheme()
  const { selectionList } = useSelectionMode()

  if( selectionList.size === 0 ) {
    return null
  }

  return (
    <View style={ styles.selectionCountContainer }>
      <Text style={ [ styles.selectionCount, { color:colors.text }]}>
        { selectionList.size } selected
      </Text>
    </View>
  )

}

const styles = StyleSheet.create( {

  selectionCountContainer: {
    marginRight: 8,
  },

  selectionCount: {
    fontSize: 15,
    fontWeight: '500',
  },

} )

export default SelectionCounter
