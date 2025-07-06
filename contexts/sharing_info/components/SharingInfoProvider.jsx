import * as Sharing from 'expo-sharing'
import { SharingInfoContext } from '../context'
import { useEffect, useState } from 'react'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SharingInfoProviderProps
 * @property { ReactElement } children
 * @property { () => void } onLoadInfo
 */

/**
 * @param { SharingInfoProviderProps } props
 * @returns { ReactElement }
 */
const SharingInfoProvider = ( props ) => {

  const { children, onLoadInfo:handleLoadInfo } = props
  const [ isAvailable, setIsAvailable ] = useState( false )

  useEffect( () => {
    const fn = async() => {
      const isAvailable = await Sharing.isAvailableAsync()
      setIsAvailable( isAvailable )
      handleLoadInfo()
    }
    fn()
  }, [] )  // eslint-disable-line

  return (
    <SharingInfoContext value={ { isAvailable } }>
      { children }
    </SharingInfoContext>
  )

}

export default SharingInfoProvider
