import Ionicons from '@/components/Ionicons'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SelectionCircleProps
 * @property { boolean } isSelected
 */

/**
 * @param { SelectionCircleProps } props
 * @returns { ReactElement }
 */
const SelectionCircle = ( props ) => {
  const { isSelected } = props
  const { colors } = useTheme()
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
