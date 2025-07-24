import { Pressable } from 'react-native-gesture-handler'
import { StyleSheet, TouchableOpacity as RNTouchableOpacity } from 'react-native'

/**
 * @import { TouchableOpacityProps } from './TouchableOpacityProps'
 * @import { ReactElement } from 'react'
 */

/**
 * @param { TouchableOpacityProps } props
 * @returns { ReactElement }
 */
const TouchableOpacity = ( props ) => {
  const { children, disabled, style, onPress, onLongPress, hitSlop, ...restProps } = props
  const buttonStyle = ( style instanceof Array ) ? style : [ style ]
  return (
    <RNTouchableOpacity
      disabled={ disabled }
      style={ [ styles.relative, ...buttonStyle ] } { ...restProps }>
      { children }
      <Pressable
        disabled={ disabled }
        style={ styles.touchArea }
        hitSlop={ hitSlop }
        onPress={ onPress }
        onLongPress={ onLongPress } />
    </RNTouchableOpacity>
  )
}

const styles = StyleSheet.create( {

  relative: {
    position: 'relative',
  },

  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

} )

export default TouchableOpacity
