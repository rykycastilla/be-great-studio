import { TaskManager } from '../services/TaskManager'
import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * @typedef { object } TaskManagerResult
 * @property { boolean } isWorking
 * @property { ( task:Promise<unknown> ) => void } addTask
 */

/**
 * @returns { TaskManagerResult }
 */
export function useTaskManager() {

  const [ isWorking, setIsWorking ] = useState( false )

  const taskManager = useMemo( () => {
    return new TaskManager()
  }, [] )

  useEffect( () => {
    taskManager.onworkingstatechange = ( isWorking ) => setIsWorking( isWorking )
    return () => { taskManager.onworkingstatechange = null }
  }, [ taskManager ] )

  const addTask = useCallback(
    /** @type { ( task:Promise<unknown> ) => void } */
    ( task ) => {
      taskManager.addTask( task )
    }, [ taskManager ] )

  return { isWorking, addTask }

}
