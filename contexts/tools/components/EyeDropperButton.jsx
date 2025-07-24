import TouchableOpacity from '@/components/TouchableOpacity'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Tool } from 'react-native-drawing'
import { useTheme } from '@/contexts/theme'
import { useTools } from '../hooks/tools'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const EyeDropperButton = () => {
  const { colors } = useTheme()
  const { auxTool, setAuxTool } = useTools()

  const toggleEyeDropper = () => {
    if( auxTool === Tool.EYE_DROPPER ) { setAuxTool( null ) }
    else { setAuxTool( Tool.EYE_DROPPER ) }
  }

  return (
    <TouchableOpacity
      style={[
        styles.eyeDropperButton,
        { backgroundColor: auxTool === Tool.EYE_DROPPER ? colors.primary : 'transparent' },
      ] }
      onPress={ toggleEyeDropper }>
      <Ionicons
        name="eyedrop-outline"
        size={24}
        color={ auxTool === Tool.EYE_DROPPER ? '#FFFFFF' : colors.text } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  eyeDropperButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default EyeDropperButton
