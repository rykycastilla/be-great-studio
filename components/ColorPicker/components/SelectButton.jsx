import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SelectButtonProps
 * @property { boolean } disabled
 * @property { () => void } onConfirm
 */

/**
 * @param { SelectButtonProps } props
 * @returns { ReactElement }
 */
const SelectButton = ( props ) => {
  const { disabled, onConfirm:handleConfirm } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={ [
        styles.selectButton, { backgroundColor:( disabled ? colors.inactive : colors.primary ) },
      ] }
      onPress={ handleConfirm }
      disabled={ disabled }>
      <Text style={ [ styles.buttonText, { color: '#FFFFFF' } ] }>Select</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {

  selectButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

} )

export default SelectButton
