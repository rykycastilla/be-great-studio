import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet } from 'react-native'
import { useRouter } from '@/contexts/debounced_router'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const SettingsButton = () => {
  const { colors } = useTheme()
  const router = useRouter()
  return (
    <TouchableOpacity
      style={ [ styles.iconButton, { backgroundColor:colors.card } ] }
      onPress={ () => router.push( '/settings' ) }>
      <Ionicons name="settings-outline" size={ 22 } color={ colors.primary } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default SettingsButton
