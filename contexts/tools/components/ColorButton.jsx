import ColorModal from './ColorModal'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Tool } from 'react-native-drawing'
import { useColor } from '../hooks/color'
import { useColorList } from '../hooks/color_list'
import { useModal } from '@/contexts/modal'
import { useTools } from '../hooks/tools'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorButtonProps
 * @property { ( color:string ) => void } dispatchColorPicker
 */

/**
 * @param { ColorButtonProps } props
 * @returns { ReactElement }
 */
const ColorButton = ( props ) => {
  const { dispatchColorPicker } = props
  const [ colorList ] = useColorList()
  const [ color, setColor ] = useColor()
  const { tool, auxTool } = useTools()
  const disabled = ( auxTool !== null ) || ( tool === Tool.ERASER )
  const dispatchColorModal = useModal(
    'color-selection', ColorModal,
    { colorList, currentColor:color, setCurrentColor:setColor, dispatchColorPicker },
  )
  return (
    <TouchableOpacity
      style={[
        styles.colorButton,
        {
          backgroundColor: color,
          opacity: disabled ? 0.3 : 1,
          borderRadius: 8,
        },
      ]}
      onPress={ () => dispatchColorModal() }
      disabled={ disabled } />

  )
}

const styles = StyleSheet.create( {
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
} )

export default ColorButton
