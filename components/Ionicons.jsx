import { Ionicons as ExpoIcon } from '@expo/vector-icons'

/**
 * @import { ExpoIcon as ExpoIconName } from '@/types/ExpoIcon'
 * @import { ReactElement } from 'react'
 */

/**
 * @module Ionicons
 * This module was created to fix some issues related with Expo Ionicons layout
 * on window mode in Android
 */

/**
 * @typedef { object } IoniconsProps
 * @property { ExpoIconName } name
 * @property { number } size
 * @property { string } color
 */

/**
 * @param { IoniconsProps } props
 * @returns { ReactElement }
 */
const Ionicons = ( props ) => {

  const { name, size, color } = props

  return (
    <ExpoIcon
      name={ name }
      color={ color }
      style={ {
        width: size,
        height: size,
        fontSize: size * 0.9,
        textAlign: 'center',
        textAlignVertical: 'center',
      } } />
  )
}

export default Ionicons
