import * as SplashScreen from 'expo-splash-screen'
import RouteStack from '@/components/RouteStack'
import { WindowProvider } from '@/contexts/window'
import { DrawingListProvider } from '@/contexts/drawing_list'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Locales } from '@/locales'
import { LanguageProvider } from '@/contexts/language'
import { LoaderProvider } from '@/contexts/loader'
import { ModalProvider } from '@/contexts/modal'
import { OffscreenBrowserProvider } from '@/utils/OffscreenBrowser'
import { SettingsProvider } from '@/contexts/settings'
import { SharingInfoProvider } from '@/contexts/sharing_info'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from '@/contexts/theme'
import { useCallback, useEffect, useState } from 'react'
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
  const [ drawingListLoaded, setDrawingListLoaded ] = useState( false )
  const [ settingsLoaded, setSettingsLoaded ] = useState( false )
  const [ sharingInfoLoaded, setSharingInfoLoaded ] = useState( false )

  useEffect( () => {
    if( drawingListLoaded && settingsLoaded && sharingInfoLoaded ) { SplashScreen.hide() }
  }, [ drawingListLoaded, settingsLoaded, sharingInfoLoaded ] )

  const handleDrawingListLoad = useCallback( () => {
    setDrawingListLoaded( true )
  }, [] )

  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <StatusBar style={ ( colorScheme === 'dark' ) ? 'light' : 'dark' } />
      <ThemeProvider>
        <WindowProvider backgroundColor={ backgroundColor }>
          <LanguageProvider langs={ Locales } defaultLang="en">
            <SharingInfoProvider onLoadInfo={ () => setSharingInfoLoaded( true ) }>
              <SettingsProvider onLoad={ () => setSettingsLoaded( true ) }>
                <DrawingListProvider onLoad={ handleDrawingListLoad }>
                  <LoaderProvider>
                    <ModalProvider>
                      <RouteStack />
                      <OffscreenBrowserProvider />
                    </ModalProvider>
                  </LoaderProvider>
                </DrawingListProvider>
              </SettingsProvider>
            </SharingInfoProvider>
          </LanguageProvider>
        </WindowProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )

}

export default AppLayout
