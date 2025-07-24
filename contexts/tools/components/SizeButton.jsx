import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet } from 'react-native'
import { useColor } from '../hooks/color'
import { useSize } from '../hooks/size'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { Size } from '../models'
 */

/**
 * @typedef { object } SizeButtonProps
 * @property { Size } target
 * @property { boolean } disabled
 */

/**
 * @param { SizeButtonProps } props
 * @returns { ReactElement }
 */
const SizeButton = ( props ) => {
  const { target, disabled } = props
  const size = target + 1
  const [ toolSize, setToolSize ] = useSize()
  const { colors } = useTheme()
  const [ color ] = useColor()
  return (
    <TouchableOpacity
      style={ [
        styles.sizeButton,
        {
          width: 14 + size * 6,
          height: 14 + size * 6,
          backgroundColor:
        toolSize === target
          ? disabled
            ? colors.inactive
            : color
          : 'transparent',
          borderColor:
        toolSize === target
          ? disabled
            ? colors.inactive
            : color
          : colors.border,
        },
      ] }
      onPress={ () => setToolSize( target ) }
      disabled={ disabled } />
  )
}

const styles = StyleSheet.create( {
  sizeButton: {
    borderWidth: 1.5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default SizeButton
