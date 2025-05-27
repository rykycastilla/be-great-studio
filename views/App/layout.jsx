import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from '@/hooks/theme/index'
import { useColorScheme } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const AppLayout = () => {

  const colorScheme = useColorScheme()
  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#FFFFFF'

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor:'red' }}>
      <StatusBar style={ ( colorScheme === 'dark' ) ? 'light' : 'dark' } />
      <SafeAreaProvider style={{ backgroundColor }}>
        <ThemeProvider>
          <Stack
            screenOptions={ {
              headerShown: false,
              animationDuration: 250,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              presentation: 'card',
              animation: 'slide_from_right',
              contentStyle: {
                backgroundColor,
              },
              animationTypeForReplace: 'push',
            } }
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )

}

export default AppLayout
