import RouteStack from '@/components/RouteStack'
import StatusBar from './components/StatusBar'
import { AppProvider } from '@/contexts/app'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { OffscreenBrowserProvider } from '@/utils/OffscreenBrowser'
import { ThemeProvider } from '@/contexts/theme'
import { useBoot } from '@/hooks/boot'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const AppLayout = () => {

  const getReady = useBoot( 'drawing-list', 'settings', 'sharing-info' )

  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <ThemeProvider>
        <StatusBar />
        <AppProvider getReady={ getReady }>
          <RouteStack />
          <OffscreenBrowserProvider />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )

}

export default AppLayout
