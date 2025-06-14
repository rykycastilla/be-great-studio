import ColorPicker from '@/components/ColorPicker'
import { useColorList } from '@/contexts/tools'
import { View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorPickerProps
 * @property { boolean } showColorPicker
 * @property { string } defaultColor
 * @property { () => void } hideColorPicker
 */

/**
 * @param { ColorPickerProps } props
 * @returns { ReactElement }
 */
const DrawingColorPicker = ( props ) => {
  const { showColorPicker, defaultColor, hideColorPicker } = props
  const { createColor } = useColorList()
  return (
    <View>
      <ColorPicker initialColor={ defaultColor } visible={ showColorPicker }
        onSelectColor={ ( color ) => createColor( color ) }
        onClose={ hideColorPicker } />
    </View>
  )
}

export default DrawingColorPicker
