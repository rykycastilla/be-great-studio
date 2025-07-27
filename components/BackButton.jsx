import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet } from 'react-native'
import { useBack } from '@/hooks/back'
import { useCallback } from 'react'
import { useRouter } from '@/contexts/debounced_router'
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

  useBack( handleBack )

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
