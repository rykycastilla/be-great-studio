import { useContext } from 'react'
import { WindowContext } from '../context'

/**
 * @returns { { width:number, height:number } }
 */
export function useDimensions() {
  const { layout } = useContext( WindowContext )
  return layout
}
