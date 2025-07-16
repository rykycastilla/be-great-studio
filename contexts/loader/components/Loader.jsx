/**
 * @import { ReactElement } from 'react'
 */

import { BlurView } from 'expo-blur'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @returns { ReactElement }
 */
const Loader = () => {
  const { theme, colors } = useTheme()
  const actualBlurIntensity = theme === 'dark' ? 80 : 50
  return (
    <View pointerEvents="auto" style={ styles.container }>
      <BlurView
        intensity={ actualBlurIntensity }
        tint={ theme === 'dark' ? 'dark' : 'light' }
        style={ styles.blur }>
        <ActivityIndicator role='banner' size="large" color={ colors.primary } />
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create( {

  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba( 0, 0, 0, 0.01 )',
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

} )

export default Loader
