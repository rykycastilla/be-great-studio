import { ThemeContext } from './context'
import { useContext } from 'react'

/**
 * @returns { ThemeContext }
*/
export function useTheme() {
  return useContext( ThemeContext )
}
