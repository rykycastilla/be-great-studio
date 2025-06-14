import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorPreviewProps
 * @property { string } color
 */

/**
 * @param { ColorPreviewProps } props
 * @returns { ReactElement }
 */
const ColorPreview = ( props ) => {
  const { color } = props
  const { colors } = useTheme()
  return (
    <View
      style={ [
        styles.colorPreview,
        { backgroundColor:color, borderColor:colors.border },
      ] } />
  )
}

const styles = StyleSheet.create( {
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 16,
  },
} )

export default ColorPreview
