import * as SplashScreen from 'expo-splash-screen'
import SafeAreaProvider from '@/components/SafeAreaProvider'
import { SettingsProvider } from '@/contexts/settings'
import { DrawingListProvider } from '@/contexts/drawing_list'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ModalProvider } from '@/contexts/modal'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from '@/contexts/theme'
import { useCallback } from 'react'
import { useColorScheme } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

SplashScreen.preventAutoHideAsync()

/**
 * @returns { ReactElement }
 */
const AppLayout = () => {

  const colorScheme = useColorScheme()
  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#FFFFFF'

  const handleDrawingListLoad = useCallback( () => {
    SplashScreen.hide()
  }, [] )

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor:'red' }}>
      <StatusBar style={ ( colorScheme === 'dark' ) ? 'light' : 'dark' } />
      <ThemeProvider>
        <SafeAreaProvider backgroundColor={ backgroundColor }>
          <DrawingListProvider onLoad={ handleDrawingListLoad }>
            <ModalProvider>
              <SettingsProvider>
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
                  } } />
              </SettingsProvider>
            </ModalProvider>
          </DrawingListProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )

}

export default AppLayout
