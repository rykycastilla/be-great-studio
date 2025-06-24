import OffscreenBrowser from './OffscreenBrowser.jsx'
import { AccessManager } from './AccessManager'
import { useEffect, useState } from 'react'

/**
 * @import { MessageDriver } from './MessageDriver'
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement[] }
 */
const OffscreenBrowserProvider = () => {
  const [ driverList, setDriverList ] = useState( /** @type { MessageDriver[] } */ ( [] ) )
  useEffect( () => {
    AccessManager.onAccessListChange( ( driverList ) => setDriverList( [ ...driverList ] ) )
    return () => AccessManager.onAccessListChange( null )
  }, [] )
  return driverList.map( ( driver ) => <OffscreenBrowser key={ driver.key } driver={ driver } /> )
}

export default OffscreenBrowserProvider
