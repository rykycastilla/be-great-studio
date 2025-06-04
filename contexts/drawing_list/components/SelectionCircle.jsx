import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 * @import { ThemeContext } from '@/contexts/theme'
 */

/**
 * @typedef { object } SelectionCircleProps
 * @property { boolean } isSelected
 * @property { ThemeContext[ 'colors' ] } colors
 */

/**
 * @param { SelectionCircleProps } props
 * @returns { ReactElement }
 */
const SelectionCircle = ( props ) => {
  const { isSelected, colors } = props
  return (
    <View
      style={ [
        styles.selectionCircle,
        isSelected
          ? { backgroundColor:colors.primary }
          : { borderColor:colors.border, borderWidth:2 },
      ] }>
      { isSelected && <Ionicons name="checkmark" size={ 16 } color="#FFFFFF" /> }
    </View>
  )
}

const styles = StyleSheet.create( {
  selectionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
} )

export default SelectionCircle
