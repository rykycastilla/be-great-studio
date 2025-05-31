import AnimatedModal from '@/components/AnimatedModal'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/hooks/theme'
import { useRouter } from 'expo-router'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } SaveWarningModalProps
 * @property { boolean } showExitConfirmation
 * @property { ( showExitConfirmation:boolean ) => void } setShowExitConfirmation
 */

/**
 * @param { SaveWarningModalProps } props
 * @returns { ReactElement }
 */
const SaveWarningModal = ( props ) => {

  const { showExitConfirmation, setShowExitConfirmation } = props
  const { colors } = useTheme()
  const router = useRouter()

  const handleExit = () => {
    setShowExitConfirmation( false )
    router.back()
  }

  return (
    <AnimatedModal
      visible={ showExitConfirmation }
      onClose={ () => setShowExitConfirmation( false ) }
      blurIntensity={ 200 }>
      <View style={ [ styles.modalContent, { backgroundColor:colors.card } ] }>
        <Text style={ [ styles.modalTitle, { color:colors.text }]  }>Exit without saving?</Text>
        <Text style={ [ styles.warningText, { color:colors.text } ] }>
          You have unsaved changes. If you exit now, your progress will be lost.
        </Text>
        <View style={styles.warningButtons}>
          <TouchableOpacity
            style={ [ styles.warningButton, { backgroundColor:colors.background } ] }
            onPress={ () => setShowExitConfirmation( false ) }>
            <Text style={ [ styles.warningButtonText, { color:colors.primary } ] }>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ [ styles.warningButton, { backgroundColor:colors.primary } ] }
            onPress={ handleExit }>
            <Text style={ [ styles.warningButtonText, { color: '#FFFFFF' } ] }>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create( {

  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  warningText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },

  warningButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  warningButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  warningButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

} )

export default SaveWarningModal
