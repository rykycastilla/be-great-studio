import { StyleSheet, Text } from 'react-native'
import { useModalAction, useModalConfig } from '@/contexts/modal'
import { useRouter } from 'expo-router'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SaveWarningModalProps
 * @property { boolean } showExitConfirmation
 * @property { ( showExitConfirmation:boolean ) => void } setShowExitConfirmation
 */

/**
 * @param { object } props
 * @returns { ReactElement }
 */
const SaveWarningModal = ( props ) => {  // eslint-disable-line

  const { colors } = useTheme()
  const router = useRouter()
  useModalConfig( { title:'Exit without saving?', acceptButtonTitle:'Exit' } )

  useModalAction( () => {
    router.back()
  } )

  return (
    <Text style={ [ styles.text, { color:colors.text } ] }>
      You have unsaved changes. If you exit now, your progress will be lost.
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

export default SaveWarningModal
