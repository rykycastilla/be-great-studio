import { StyleSheet, TextInput } from 'react-native'
import { useEffect } from 'react'
import { useTheme } from '@/hooks/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ChangeNameModalProps
 * @property { string } defaultName
 * @property { ( name:string ) => void } setName
 */

/**
 * @param { ChangeNameModalProps } props
 * @returns { ReactElement }
 */
const ChangeNameModal = ( props ) => {
  const { defaultName, setName } = props
  const { colors } = useTheme()

  useEffect( () => {
    setName( defaultName )
  }, [] )  // eslint-disable-line

  return (
    <TextInput
      autoFocus
      defaultValue={ defaultName }
      style={ [ styles.text, { color:colors.text } ] }
      onChangeText={ setName } />
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

export default ChangeNameModal
