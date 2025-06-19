import { SettingsContext } from '../context'
import { useContext } from 'react'

/**
 * @returns { SettingsContext }
 */
export function useSettings() {
  return useContext( SettingsContext )
}
