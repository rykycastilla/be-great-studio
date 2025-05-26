import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/hooks/theme/index'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const BackButton = () => {
  const { colors } = useTheme()
  const router = useRouter()
  return (
    <TouchableOpacity
      style={ [ styles.backButton, { backgroundColor:colors.card } ] }
      onPress={ () => router.back() }>
      <Ionicons name="chevron-back" size={ 22 } color={ colors.primary } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default BackButton
