import { StyleSheet, TextInput } from 'react-native'
import { useEffect } from 'react'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } InputProps
 * @property { string } defaultValue
 * @property { ( value:string ) => void } setValue
 */

/**
 * @param { InputProps } props
 * @returns { ReactElement }
 */
const Input = ( props ) => {

  const { defaultValue, setValue } = props
  const { colors } = useTheme()

  useEffect( () => {
    setValue( defaultValue )
  }, [ defaultValue, setValue ] )

  return (
    <TextInput
      autoFocus
      defaultValue={ defaultValue }
      style={ [ styles.text, { color:colors.text } ] }
      onChangeText={ setValue } />
  )

}

const styles = StyleSheet.create( {
  text: {
    height: 60,
    marginBottom: 8,
    fontSize: 19,
    fontWeight: '800',
    fontFamily: 'System',
  },
} )

export default Input
