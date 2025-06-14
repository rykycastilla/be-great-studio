import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useLongCallback } from '@/hooks/long_callback'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } EditColorsButtonProps
 * @property { boolean } isDeleteMode
 * @property { ( isDeleteMode:boolean ) => void } onIsDeleteModeChange
 * @property { Set<string> } selectionList
 * @property { () => void } dispatchColorPicker
 * @property { ( ...color:string[] ) => void } deleteColor
 */

/**
 * @param { EditColorsButtonProps } props
 * @returns { ReactElement }
 */
const EditColorsButton = ( props ) => {

  const {
    isDeleteMode, onIsDeleteModeChange:setIsDeleteMode,
    dispatchColorPicker, selectionList, deleteColor,
  } = props
  const { colors } = useTheme()

  const toggleIsDeleteMode = useLongCallback( () => {
    setIsDeleteMode( !isDeleteMode )
  } )

  const deleteColors = () => {
    setIsDeleteMode( false )
    deleteColor( ...selectionList )
  }

  return (
    <TouchableOpacity
      style={ [ styles.addColorButton, { borderColor:colors.border } ] }
      onPress={ isDeleteMode ? deleteColors : dispatchColorPicker }
      onLongPress={ toggleIsDeleteMode }>
      <Ionicons name={ isDeleteMode ? 'trash-outline' : 'add' } size={ 24 } color={ colors.text } />
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {
  addColorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
} )

export default EditColorsButton
