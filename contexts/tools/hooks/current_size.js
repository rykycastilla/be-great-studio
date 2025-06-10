import { useSize } from './size'

/**
 * @import { Size } from '../models'
 */

/**
 * @returns { Size }
 */
export function useCurrentSize() {
  const [ size ] = useSize()
  return size
}
