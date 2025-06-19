import { SettingsContext } from '../context'
import { useEffect } from 'react'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SettingsContextProps
 * @property { ReactElement } children
 * @property { () => void } onLoad
 */

/**
 * @param { SettingsContextProps } props
 * @returns { ReactElement }
 */
const ConfigProvider = ( props ) => {

  const { children, onLoad:handleLoad } = props
  const [ resolution, setResolution, loadingResolution ] = useStorageState( 32, 'config-resolution' )

  useEffect( () => {
    const fn = async() => {
      await loadingResolution
      handleLoad()
    }
    fn()
  }, [] )  // eslint-disable-line

  return (
    <SettingsContext.Provider value={ { resolution, setResolution } }>
      { children }
    </SettingsContext.Provider>
  )
}

export default ConfigProvider
