import { LoaderContext } from '../context'
import { useCallback, useContext } from 'react'

/**
 * Gets function to call loader UI while task `promise` is resolving
 * @returns { ( task:Promise<unknown> ) => void }
 */
export function useLoader() {
  const { addTask } = useContext( LoaderContext )
  return useCallback( ( task ) => {
    addTask( task )
  }, [ addTask ] )
}
