import { DebouncedRouterContext } from '../context'
import { useContext } from 'react'

/**
 * @import { IRouter as Router } from '../services/IRouter'
 */

/**
 * Provides access to the router.
 * This router can block its navigation interactions until the new focused page is shown.
 * Focused pages are determined using `useFocus`.
 * @returns { Router }
 */
export function useRouter() {
  const { router } = useContext( DebouncedRouterContext )
  return router
}
