import { capitalizeFirst } from '@/utils/capitalize_first'
import { StyleSheet, Text } from 'react-native'
import { useModalAction, useModalConfig } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } WarningModalProps
 * @property { [ action:string, drawingList:Drawing[], onAccept:( ( drawingList:Drawing[] ) => void ) ] } args
 */

/**
 * @param { WarningModalProps } props
 * @returns { ReactElement }
 */
const WarningModal = ( props ) => {

  const { args } = props
  const [ action, drawingList, onAccept ] = args
  const isOnlyOne = drawingList.length === 1
  const { colors } = useTheme()
  useModalConfig( { title:`${ capitalizeFirst( action ) } warning` } )

  useModalAction( () => {
    onAccept( drawingList )
  } )

  return (
    <Text style={ [ styles.text, { color:colors.text } ] }>
      Area you sure y want to { action } { drawingList.length } { isOnlyOne ? 'element' : 'elements' }
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

export default WarningModal
