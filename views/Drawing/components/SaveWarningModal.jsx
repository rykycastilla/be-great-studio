import { StyleSheet, Text } from 'react-native'
import { useLanguage } from '@/contexts/language'
import { useModalAction, useModalConfig } from '@/contexts/modal'
import { useRouter } from '@/contexts/debounced_router'
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
  const { t } = useLanguage()
  useModalConfig( { title:t( 'exit-without-saving' ), acceptButtonTitle:t( 'exit' ) } )

  useModalAction( () => {
    router.back()
  } )

  return (
    <Text adjustsFontSizeToFit style={ [ styles.text, { color:colors.text } ] }>
      { t( 'exit-without-saving-warning' ) }
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
