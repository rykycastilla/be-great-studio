import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } BackButtonProps
 * @property { boolean } [ blockNavigation ]
 * @property { () => void } [ fallback ]
 */

/**
 * @param { BackButtonProps } props
 * @returns { ReactElement }
 */
const BackButton = ( props ) => {

  const { blockNavigation, fallback } = props
  const { colors } = useTheme()
  const router = useRouter()

  const handleBack = useCallback( () => {
    if( !blockNavigation ) { return router.back() }
    if( fallback !== undefined ) { fallback() }
  }, [ router, blockNavigation, fallback ] )

  return (
    <TouchableOpacity
      style={ [ styles.backButton, { backgroundColor:colors.card } ] }
      onPress={ handleBack }>
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
