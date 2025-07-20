import * as Clipboard from 'expo-clipboard'
import SelectionCircle from '@/components/SelectionCircle'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useLanguage } from '@/contexts/language'
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
 * @property { boolean } isDeleteMode
 * @property { boolean } isSelected
 * @property { () => void } onToggleSelection
 */

/**
 * @param { ColorOptionProps } props
 * @returns { ReactElement }
 */
const ColorOption = ( props ) => {

  const {
    color, currentColor, setCurrentColor, isDeleteMode, isSelected,
    onToggleSelection:handleToggleSelection,
  } = props

  const { colors } = useTheme()
  const hide = useModalHider()
  const { t } = useLanguage()

  const handleLongPress = useLongCallback( async() => {
    await Clipboard.setStringAsync( color )
    ToastAndroid.show( `${ t( 'copied' ) }: ${ color }`, ToastAndroid.SHORT )
  } )

  const selectColor = () => {
    setCurrentColor( color )
    hide()
  }

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
      onPress={ isDeleteMode ? handleToggleSelection : selectColor }
      onLongPress={ handleLongPress }>
      {
        ( isDeleteMode && ( color !== currentColor ) ) &&
        <View style={ styles.selectionCircle }>
          <SelectionCircle isSelected={ isSelected } />
        </View>
      }
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {

  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  selectionCircle: {
    top: -5,
    left: -5,
  },

} )

export default ColorOption
