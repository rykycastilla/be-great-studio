import { SharingInfoContext } from '../context'
import { useContext } from 'react'

/**
 * Used to identify if this platform supports sharing feature
 * @returns { SharingInfoContext }
 */
export function useSharingInfo() {
  return useContext( SharingInfoContext )
}
