import { DebouncedRouter } from '../services/DebouncedRouter'
import { DebouncedRouterContext } from '../context'
import { useMemo } from 'react'
import { useRouter } from 'expo-router'

/**
 * @import { ReactElement, ReactNode } from 'react'
 */

/**
 * @typedef { object } DebouncedRouterProviderProps
 * @property { ReactNode } children
 */

/**
 * @param { DebouncedRouterProviderProps } props
 * @returns { ReactElement }
 */
const DebouncedRouterProvider = ( props ) => {

  const { children } = props
  const expoRouter = useRouter()

  const router = useMemo( () => {
    return new DebouncedRouter( expoRouter )
  }, [] )  // eslint-disable-line

  return (
    <DebouncedRouterContext.Provider value={ { router } }>
      { children }
    </DebouncedRouterContext.Provider>
  )

}

export default DebouncedRouterProvider
