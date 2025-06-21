import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
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
    zIndex: 120,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

} )

export default HiderButton
