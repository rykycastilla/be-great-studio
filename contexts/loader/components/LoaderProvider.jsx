import Loader from './Loader'
import { LoaderContext } from '../context'
import { useTaskManager } from '../hooks/task_manager'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } LoaderProviderProps
 * @property { ReactElement[] | ReactElement } children
 */

/**
 * @param { LoaderProviderProps } props
 * @returns { ReactElement }
 */
const LoaderProvider = ( props ) => {
  const { children } = props
  const { isWorking, addTask } = useTaskManager()
  return (
    <LoaderContext value={ { addTask } }>
      { children }
      { isWorking && <Loader /> }
    </LoaderContext>
  )
}

export default LoaderProvider
