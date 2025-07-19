import { capitalizeFirst } from '@/utils/capitalize_first'
import { StyleSheet, Text } from 'react-native'
import { useLanguage } from '@/contexts/language'
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
  const elementGrammaticalNumber = ( drawingList.length === 1 ) ? 'warning-single-element' : 'warning-many-elements'
  const { colors } = useTheme()
  const { t } = useLanguage()
  useModalConfig( { title:t( 'warning-option-title', capitalizeFirst( action ) ) } )

  useModalAction( () => {
    onAccept( drawingList )
  } )

  return (
    <Text style={ [ styles.text, { color:colors.text } ] }>
      { t( 'option-warning', action, drawingList.length, t( elementGrammaticalNumber ) ) }
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
