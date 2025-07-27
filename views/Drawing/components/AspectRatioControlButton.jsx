import AspectRatioModal from './AspectRatioModal'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, Text } from 'react-native'
import { useModal } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { InteractiveDrawing } from '../hooks/drawing'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } AspectRatioControlButtonProps
 * @property { InteractiveDrawing } drawing
 */

/**
 * @param { AspectRatioControlButtonProps } props
 * @returns { ReactElement }
 */
const AspectRatioControlButton = ( props ) => {
  const { drawing } = props
  const { colors } = useTheme()
  const dispatchAspectRatioModal = useModal(
    'aspect-ratio', AspectRatioModal,
    { onAspectRatioChange:drawing.setAspectRatio },
  )
  return (
    <TouchableOpacity
      style={ [ styles.controlButton, { backgroundColor:colors.card } ] }
      onPress={ dispatchAspectRatioModal }>
      <Text adjustsFontSizeToFit style={ [ styles.controlText, { color: colors.text } ] }>{ drawing.aspectRatio }</Text>
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

export default AspectRatioControlButton
