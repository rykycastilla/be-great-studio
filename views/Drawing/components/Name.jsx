import ChangeNameModal from './ChangeNameModal'
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { useCallback, useState } from 'react'
import { useModal } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { InteractiveDrawing } from '../hooks/drawing'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } NameProps
 * @property { InteractiveDrawing } drawing
 */

/**
 * @param { NameProps } props
 * @returns { ReactElement }
 */
const Name = ( props ) => {

  const { drawing } = props
  const { colors } = useTheme()
  const [ newName, setNewName ] = useState( drawing.name )

  const handleChangeNameAccept = useCallback( () => {
    drawing.setName( newName )
  }, [ newName, drawing.setName ] )  // eslint-disable-line

  const dispatchChangeNameModal = useModal(
    'Change name', ChangeNameModal, { defaultName:drawing.name, setName:setNewName },
    {
      acceptButtonTitle: 'Change',
      isButtonInactive: newName === '',
      onAccept: handleChangeNameAccept,
    },
  )

  return (
    <TouchableWithoutFeedback onPress={ dispatchChangeNameModal }>
      <Text style={ [ styles.name, { color:colors.text } ] }>
        { drawing.name }
      </Text>
    </TouchableWithoutFeedback>
  )

}

const styles = StyleSheet.create( {
  name: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },
} )

export default Name
