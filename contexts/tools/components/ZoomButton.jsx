import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
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
const ZoomButton = () => {

  const { colors } = useTheme()
  const { auxTool, setAuxTool } = useTools()

  const toggleZoom = () => {
    if( auxTool === Tool.ZOOM ) { setAuxTool( null ) }
    else { setAuxTool( Tool.ZOOM ) }
  }

  return (
    <TouchableOpacity
      style={ [
        styles.toolButton, { backgroundColor: auxTool === Tool.ZOOM ? colors.primary : 'transparent' },
      ] }
      onPress={ toggleZoom }>
      <Ionicons name="search" size={ 24 } color={ auxTool === Tool.ZOOM ? '#FFFFFF' : colors.text } />
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

export default ZoomButton
