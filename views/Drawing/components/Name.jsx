import ChangeNameModal from './ChangeNameModal'
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { useCallback, useState } from 'react'
import { useModal } from '@/contexts/modal'
import { useStaticCallback } from '@/hooks/static_callback'
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

  const onAccept = useCallback( () => {
    drawing.setName( newName )
  }, [ newName, drawing.setName ] )  // eslint-disable-line

  const onAcceptStatic = useStaticCallback( onAccept )

  const dispatchChangeNameModal = useModal(
    'drawing-view-name-changer', ChangeNameModal,
    { defaultName:drawing.name, name:newName, setName:setNewName, onAccept:onAcceptStatic },
  )

  return (
    <TouchableWithoutFeedback onPress={ dispatchChangeNameModal }>
      <Text
        numberOfLines={ 1 }
        ellipsizeMode="tail"
        style={ [ styles.name, { color:colors.text } ] }>
        { drawing.name }
      </Text>
    </TouchableWithoutFeedback>
  )

}

const styles = StyleSheet.create( {
  name: {
    maxWidth: '65%',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },
} )

export default Name
