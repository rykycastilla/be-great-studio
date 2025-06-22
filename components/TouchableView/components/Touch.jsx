import { StyleSheet, View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } TouchProps
 * @property { number } size
 * @property { number } x
 * @property { number } y
 */

/**
 * @param { TouchProps } props
 * @returns { ReactElement }
 */
const Touch = ( props ) => {
  const { size, x, y } = props
  return (
    <View
      style={ [
        styles.touch,
        {
          width: size,
          height: size,
          borderRadius: size / 4,
          left: x - size / 2,
          top: y - size / 2,
        },
      ] } />
  )
}

const styles = StyleSheet.create( {
  touch: {
    position: 'absolute',
    borderWidth: 1,
    zIndex: 100,
    pointerEvents: 'none',
  },
} )

export default Touch
