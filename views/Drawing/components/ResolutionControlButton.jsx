import ResolutionModal from './ResolutionModal'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, Text } from 'react-native'
import { useModal } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { InteractiveDrawing } from '../hooks/drawing'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ResolutionControlButtonProps
 * @property { InteractiveDrawing } drawing
 */

/**
 * @param { ResolutionControlButtonProps } props
 * @returns { ReactElement }
 */
const ResolutionControlButton = ( props ) => {
  const { drawing } = props
  const { colors } = useTheme()
  const dispatchResolutionModal = useModal(
    'resolution', ResolutionModal,
    { onResolutionChange( resolution ) { drawing.setResolution( resolution ) } },
  )
  return (
    <TouchableOpacity
      style={ [ styles.controlButton, { backgroundColor:colors.card } ] }
      onPress={ dispatchResolutionModal }>
      <Text style={[styles.controlText, { color:colors.text }]}>{ drawing.resolution }px</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create( {

  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlText: {
    fontSize: 14,
    fontWeight: '500',
  },

} )

export default ResolutionControlButton
