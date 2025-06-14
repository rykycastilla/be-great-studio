import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } AddColorButtonProps
 * @property { () => void } dispatchColorPicker
 */

/**
 * @param { AddColorButtonProps } props
 * @returns { ReactElement }
 */
const AddColorButton = ( props ) => {
  const { dispatchColorPicker } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={ [ styles.addColorButton, { borderColor:colors.border } ] }
      onPress={ dispatchColorPicker }>
      <Ionicons name="add" size={ 24 } color={ colors.text } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  addColorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
} )

export default AddColorButton
