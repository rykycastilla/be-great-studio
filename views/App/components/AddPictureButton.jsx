import AnimatedButton from '@/components/AnimatedButton'
import { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/hooks/theme/index'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const AddPictureButton = () => {

  const { colors } = useTheme()
  const router = useRouter()

  return (
    <AnimatedButton
      style={ [ styles.addPictureButton, { backgroundColor:colors.primary } ] }
      onPress={ () => router.push( '/drawing' ) }
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
