import ToolsModal from './ToolsModal'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Tool } from 'react-native-drawing'
import { useModal } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'
import { useTools } from '../hooks/tools'

/**
 * @import { ExpoIcon } from '@/types/ExpoIcon'
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const ToolsButton = () => {

  const { colors } = useTheme()
  const { tool, setTool, auxTool } = useTools()
  const disabled = auxTool !== null

  const dispatchToolsModal = useModal( 'tools-selection', ToolsModal, {} )

  /* eslint-disable */
  /** @type { ExpoIcon } */ const icon =
    ( tool === Tool.SQUARE_DOT_PEN ) ? 'pencil'
    : ( tool === Tool.ERASER ) ? 'ellipse-outline'
    : 'warning-outline'
  /* eslint-enable */

  return (
    <TouchableOpacity
      style={ [
        styles.toolButton,
        {
          backgroundColor: disabled ? 'transparent' : colors.primary,
          borderRadius: 8,
          opacity: disabled ? 0.3 : 1,
        },
      ] }
      onPress={ () => dispatchToolsModal( setTool ) }
      disabled={ disabled }>
      <Ionicons
        name={ icon }
        size={24}
        color={ disabled ? colors.text : '#FFFFFF' } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  toolButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default ToolsButton
