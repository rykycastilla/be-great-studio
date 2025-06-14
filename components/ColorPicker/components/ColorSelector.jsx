import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { Position } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorSelectorProps
 * @property { string } color
 * @property { Position } position
 */

/**
 * @param { ColorSelectorProps } props
 * @returns { ReactElement }
 */
const ColorSelector = ( props ) => {
  const { color, position } = props
  const { x, y } = position
  const { theme } = useTheme()
  const selectorBorderColor = theme === 'dark' ? '#FFFFFF' : '#000000'
  return (
    <View
      style={ [
        styles.selector,
        { left:( x - 15 ), top:( y - 15 ), backgroundColor:color, borderColor:selectorBorderColor },
      ] } />
  )
}

const styles = StyleSheet.create( {
  selector: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
} )

export default ColorSelector
