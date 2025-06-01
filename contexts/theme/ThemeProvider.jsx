import { ThemeContext } from './context'
import { useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'

/**
 * @import { ReactElement } from 'react'
 * @import { Theme } from './Theme'
 */

/**
 * @typedef { object } ThemeProviderProps
 * @property { ReactElement[] | ReactElement } children
 */

/**
 * @param { ThemeProviderProps } props
*/
const ThemeProvider = ( props ) => {

  const { children } = props
  const deviceTheme = /** @type { Theme } */ ( useColorScheme() )
  const [ theme, setTheme ] = useState( deviceTheme || 'light' )

  useEffect( () => {
    if( deviceTheme ) {
      setTheme( deviceTheme )
    }
  }, [ deviceTheme ] )

  const colors = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#007AFF',
      secondary: '#5AC8FA',
      card: '#F2F2F7',
      border: '#C7C7CC',
      canvas: '#F9F9F9',
      inactive: '#8E8E93',
    },
    dark: {
      background: '#000000',
      text: '#FFFFFF',
      primary: '#0A84FF',
      secondary: '#64D2FF',
      card: '#1C1C1E',
      border: '#38383A',
      canvas: '#121212',
      inactive: '#636366',
    },
  }

  return (
    <ThemeContext.Provider value={ { theme, colors:colors[ theme ] } }>
      { children }
    </ThemeContext.Provider>
  )

}

export default ThemeProvider
