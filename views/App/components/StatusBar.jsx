import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const StatusBar = () => {
  const { theme } = useTheme()
  return <ExpoStatusBar style={ ( theme === 'dark' ) ? 'light' : 'dark' } />
}

export default StatusBar
