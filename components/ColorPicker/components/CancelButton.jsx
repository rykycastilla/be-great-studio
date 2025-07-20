import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useLanguage } from '@/contexts/language'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } CancelButtonProps
 * @property { () => void } onClose
 */

/**
 * @param { CancelButtonProps } props
 * @returns { ReactElement }
 */
const CancelButton = ( props ) => {
  const { onClose } = props
  const { colors } = useTheme()
  const { t } = useLanguage()
  return (
    <TouchableOpacity
      style={ [ styles.cancelButton, { backgroundColor:colors.background } ] }
      onPress={ onClose }>
      <Text style={ [ styles.buttonText, { color:colors.primary } ] }>{ t( 'cancel' ) }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

} )

export default CancelButton
