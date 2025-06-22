import { Switch as RnSwitch } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SwitchProps
 * @property { boolean } isActive
 * @property { ( isActive:boolean ) => void } onIsActiveChange
 */

/**
 * @param { SwitchProps } props
 * @returns { ReactElement }
 */
const Switch = ( props ) => {
  const { isActive, onIsActiveChange:setIsActive } = props
  const { colors } = useTheme()
  return (
    <RnSwitch
      value={ isActive }
      onValueChange={ setIsActive }
      trackColor={ { false:colors.inactive, true:colors.primary } }
      thumbColor="#FFFFFF" />
  )
}

export default Switch
