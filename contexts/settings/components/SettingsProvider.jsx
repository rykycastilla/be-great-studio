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
  const [ aspectRatio, setAspectRatio, loadingAspectRatio ] = useStorageState( '3:4', 'config-aspect-ratio' )
  const [ showTouchCursor, setShowTouchCursor, loadingShowTouchCursor ] = useStorageState( true, 'config-show-touch-cursor' )

  useEffect( () => {
    const fn = async() => {
      await loadingResolution
      await loadingAspectRatio
      await loadingShowTouchCursor
      handleLoad()
    }
    fn()
  }, [] )  // eslint-disable-line

  return (
    <SettingsContext.Provider value={
      { resolution, setResolution, aspectRatio, setAspectRatio, showTouchCursor, setShowTouchCursor } }>
      { children }
    </SettingsContext.Provider>
  )
}

export default ConfigProvider
