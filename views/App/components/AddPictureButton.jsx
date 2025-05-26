import AnimatedButton from '@/components/AnimatedButton'
import { Alert, StyleSheet } from 'react-native'
import { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/theme/index'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const AddPictureButton = () => {
  const { colors } = useTheme()
  return (
    <AnimatedButton
      style={ [ styles.addPictureButton, { backgroundColor:colors.primary } ] }
      onPress={ () => Alert.alert( 'Creating new...' ) }
      entering={ FadeIn.delay( 300 ).duration( 300 ) }>
      <Ionicons name="add" size={ 28 } color="#FFFFFF" />
    </AnimatedButton>
  )
}

const styles = StyleSheet.create( {
  addPictureButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
} )

export default AddPictureButton
