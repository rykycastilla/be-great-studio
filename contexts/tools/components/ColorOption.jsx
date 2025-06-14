import * as Clipboard from 'expo-clipboard'
import { StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native'
import { useLongCallback } from '@/hooks/long_callback'
import { useModalHider } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorOptionProps
 * @property { string } color
 * @property { string } currentColor
 * @property { ( currentColor:string ) => void } setCurrentColor
 */

/**
 * @param { ColorOptionProps } props
 * @returns { ReactElement }
 */
const ColorOption = ( props ) => {

  const { color, currentColor, setCurrentColor } = props
  const { colors } = useTheme()
  const hide = useModalHider()

  const handleLongPress = useLongCallback( async() => {
    await Clipboard.setStringAsync( color )
    ToastAndroid.show( `Copiado: ${ color }`, ToastAndroid.SHORT )
  } )

  return (
    <TouchableOpacity
      style={ [
        styles.colorOption,
        {
          backgroundColor: color,
          borderColor: colors.border,
          borderWidth: currentColor === color ? 4 : 1,
        },
      ] }
      onPress={ () => {
        setCurrentColor( color )
        hide()
      } }
      onLongPress={ handleLongPress } />
  )

}

const styles = StyleSheet.create( {
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
} )

export default ColorOption
