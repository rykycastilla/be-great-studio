import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useCallback } from 'react'
import { useSelectionMode } from '@/contexts/drawing_list'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const SelectionButton = () => {

  const { colors } = useTheme()
  const { isSelectionMode, setIsSelectionMode } = useSelectionMode()

  // Toggle selection mode
  const handlePress = useCallback( () => {
    if( isSelectionMode ) { setIsSelectionMode( false ) }
    else { setIsSelectionMode( true ) }
  }, [ isSelectionMode, setIsSelectionMode ] )

  return (
    <TouchableOpacity onPress={ handlePress } style={ styles.selectionButton }>
      <Text style={ [ styles.selectionButtonText, { color:colors.primary } ] }>
        { isSelectionMode ? 'Cancel' : 'Select' }
      </Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {

  selectionButton: {
    justifyContent: 'center',
  },

  selectionButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },

} )

export default SelectionButton
