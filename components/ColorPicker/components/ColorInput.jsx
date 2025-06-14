import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useMemo } from 'react'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorInputProps
 * @property { string } value
 * @property { ( value:string ) => void } handleValueChange
 * @property { ( isValidInput:boolean ) => void } handleIsValidInputChange
 */

/**
 * @param { ColorInputProps } props
 * @returns { ReactElement }
 */
const ColorInput = ( props ) => {

  const { value, handleValueChange, handleIsValidInputChange } = props
  const { theme, colors } = useTheme()

  const isValidInput = useMemo( () => {
    return value.length === 6 && /^[0-9A-Fa-f]{6}$/.test( value )
  }, [ value ] )

  useEffect( () => {
    handleIsValidInputChange( isValidInput )
  }, [ isValidInput, handleIsValidInputChange ] )

  /** @type { ( value:string ) => void } */
  const handleHexInput = ( value ) => {
    const hexRegex = /^[0-9A-Fa-f]{0,6}$/
    if ( hexRegex.test( value ) ) { handleValueChange( value ) }
  }

  return (
    <View style={ styles.hexInputContainer }>
      <Text style={ [ styles.hexLabel, { color:colors.text } ] }>#</Text>
      <TextInput
        style={ [
          styles.hexInput,
          {
            color: colors.text,
            borderColor: isValidInput ? colors.border : '#FF3B30',
            backgroundColor: theme === 'dark' ? '#1C1C1E' : '#F2F2F7',
          },
        ] }
        value={ value }
        onChangeText={ handleHexInput }
        maxLength={ 6 }
        placeholder="FFFFFF"
        placeholderTextColor={ colors.inactive }
        autoCapitalize="characters"
        autoCorrect={ false }
        selectionColor={ colors.primary } />
    </View>
  )

}

const styles = StyleSheet.create( {

  hexInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  hexLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 8,
  },

  hexInput: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },

} )

export default ColorInput
