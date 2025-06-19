import { StyleSheet, Text } from 'react-native'
import { useModalAction, useModalConfig } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } WarningModalProps
 * @property { [ title:string, text:string, onAccept:( () => void ) ] } args
 */

/**
 * @param { WarningModalProps } props
 * @returns { ReactElement }
 */
const WarningModal = ( props ) => {
  const { args } = props
  const [ title, text, handleAccept ] = args
  const { colors } = useTheme()
  useModalConfig( { title } )
  useModalAction( () => handleAccept() )
  return <Text style={ [ styles.warningText, { color:colors.text } ] }>{ text }</Text>
}

const styles = StyleSheet.create( {
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
} )

export default WarningModal
