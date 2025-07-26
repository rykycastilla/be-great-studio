import { WindowProvider } from '@/contexts/window'
import { DrawingListProvider } from '@/contexts/drawing_list'
import { Locales } from '@/locales'
import { LanguageProvider } from '@/contexts/language'
import { LoaderProvider } from '@/contexts/loader'
import { ModalProvider } from '@/contexts/modal'
import { SettingsProvider } from '@/contexts/settings'
import { SharingInfoProvider } from '@/contexts/sharing_info'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement, ReactNode } from 'react'
 */

/**
 * @typedef { object } AppProviderProps
 * @property { ReactNode } children
 * @property { ( target:string ) => void } getReady
 */

/**
 * @param { AppProviderProps } props
 * @returns { ReactElement }
 */
const AppProvider = ( props ) => {
  const { children, getReady } = props
  const { colors } = useTheme()
  return (
    <WindowProvider backgroundColor={ colors.background }>
      <LanguageProvider langs={ Locales } defaultLang="en">
        <SharingInfoProvider onLoadInfo={ () => getReady( 'sharing-info' ) }>
          <SettingsProvider onLoad={ () => getReady( 'settings' ) }>
            <DrawingListProvider onLoad={ () => getReady( 'drawing-list' ) }>
              <LoaderProvider>
                <ModalProvider>
                  { children }
                </ModalProvider>
              </LoaderProvider>
            </DrawingListProvider>
          </SettingsProvider>
        </SharingInfoProvider>
      </LanguageProvider>
    </WindowProvider>
  )
}

export default AppProvider
