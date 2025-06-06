import { StyleSheet, Text } from 'react-native'
import { useModalAction } from '@/contexts/modal'
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
  const [ removableDrawingList ] = args
  const isOnlyOne = removableDrawingList.length === 1
  const { colors } = useTheme()

  useModalAction( () => {
    console.log( removableDrawingList )
  } )

  return (
    <Text style={ [ styles.text, { color:colors.text } ] }>
      Area you sure y want to delete { removableDrawingList.length } { isOnlyOne ? 'element' : 'elements' }
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
