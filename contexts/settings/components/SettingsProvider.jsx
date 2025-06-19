import { SettingsContext } from '../context'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SettingsContextProps
 * @property { ReactElement } children
 */

/**
 * @param { SettingsContextProps } props
 * @returns { ReactElement }
 */
const ConfigProvider = ( props ) => {
  const { children } = props
  const [ resolution, setResolution ] = useStorageState( 32, 'config-resolution' )
  return (
    <SettingsContext.Provider value={ { resolution, setResolution } }>
      { children }
    </SettingsContext.Provider>
  )
}

export default ConfigProvider
