import TouchableOpacity from '@/components/TouchableOpacity'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } HiderButtonProps
 * @property { () => void } onHide
 */

/**
 * @param { HiderButtonProps } props
 * @returns { ReactElement }
 */
const HiderButton = ( props ) => {
  const { onHide:handleHide } = props
  const { colors, theme } = useTheme()
  return (
    <TouchableOpacity
      style={ styles.toggleToolbarButtonHitArea }
      onPress={ handleHide }
      activeOpacity={ 0.7 }
      hitSlop={ { top:20, left:20, right:20, bottom:20 } }>
      <View style={ [
        styles.toggleToolbarButton,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
        },
      ] }>
        <Ionicons name="chevron-down" size={ 18 } color={ colors.primary } />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {

  toggleToolbarButtonHitArea: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toggleToolbarButton: {
    width: 32,
    height: 32,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

} )

export default HiderButton
