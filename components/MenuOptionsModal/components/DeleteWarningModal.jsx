import { StyleSheet, Text } from 'react-native'
import { useCallback } from 'react'
import { useDrawingList } from '@/contexts/drawing_list'
import { useModalAction, useModalConfig } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
*/

/**
 * @typedef { object } DeleteWarningModalProps
 * @property { [ removableDrawingList:Drawing[] ] } args
 */

/**
 * @param { DeleteWarningModalProps } props
 * @returns { ReactElement }
 */
const DeleteWarningModal = ( props ) => {

  const { args } = props
  const [ drawingList ] = args
  const isOnlyOne = drawingList.length === 1
  const { colors } = useTheme()
  const { removeDrawing } = useDrawingList()
  useModalConfig( { title:'Delete warning' } )

  const onAction = useCallback( async() => {
    for( const drawing of drawingList ) {
      await removeDrawing( drawing )
    }
  }, [ drawingList, removeDrawing ] )

  useModalAction( () => {
    onAction()
  } )

  return (
    <Text style={ [ styles.text, { color:colors.text } ] }>
      Area you sure y want to delete { drawingList.length } { isOnlyOne ? 'element' : 'elements' }
    </Text>
  )

}

const styles = StyleSheet.create( {
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
} )

export default DeleteWarningModal
