import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDrawingList } from '@/components/DrawingList'
import { useState } from 'react'
import { useTheme } from '@/hooks/theme'
import { wait } from '@/utils/wait'

/**
 * @import { InteractiveDrawing } from '../hooks/drawing'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } SaveEvent
 * @property { string } data
 */

/**
 * @typedef { Object } SaveButtonProps
 * @property { InteractiveDrawing } drawing
 * @property { boolean } disabled
 * @property { () => Promise<string|null> } dataRequester
 * @property { ( event:SaveEvent ) => void } onSave
 */

/**
 * @param { SaveButtonProps } props
 * @returns { ReactElement }
 */
const SaveButton = ( props ) => {

  const { drawing, disabled, dataRequester:requestData, onSave } = props
  const { saveDrawing } = useDrawingList()
  const { colors } = useTheme()
  const [ isSaving, setIsSaving ] = useState( false )

  const handleSave = async() => {
    setIsSaving( true )
    const thumbnail = await requestData()
    if( thumbnail === null ) { return }
    await saveDrawing( drawing, thumbnail )
    await wait( 400 )
    setIsSaving( false )
    onSave( { data:thumbnail } )
  }

  return (
    <TouchableOpacity
      style={ [ styles.saveButton, { backgroundColor: colors.card, opacity: disabled ? 0.5 : 1 } ] }
      disabled={ disabled || isSaving }
      onPress={ handleSave }>
      {
        isSaving
          ? <ActivityIndicator size="small" color={colors.primary} />
          : <Ionicons name="save-outline" size={22} color={colors.primary} />
      }
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default SaveButton
