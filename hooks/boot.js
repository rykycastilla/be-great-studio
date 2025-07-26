import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'

SplashScreen.preventAutoHideAsync()

class AppLoader {

  #isHidden = false

  /**
   * Hide splash screen. Only once
   * @public
   */
  hide() {
    if( this.isHidden ) { return }
    SplashScreen.hideAsync()
    this.#isHidden = true
  }

  /**
   * @returns { boolean }
   */
  get isHidden() {
    return this.#isHidden
  }

}

/**
 * @callback GetReadyFunction
 * Resolves a task
 * @param { string } target
 * @returns { void }
 */

/**
 * Hides the splash screen when all tasks are ready
 * @param { string[] } targetList  Targets to be resolved by `getReady`
 * @returns { GetReadyFunction }  `getReady` function
 */
export function useBoot( ...targetList ) {

  const [ readyTaskIndex, setReadyTaskIndex ] = useState( /** @type { Record<string,boolean> } */ ( {} ) )

  // Fxiing list of tasks
  const taskList = useMemo( () => {
    return [ ...targetList ]
  }, [] )  // eslint-disable-line

  const appLoader = useMemo( () => {
    return new AppLoader()
  }, [] )

  const getReady = useCallback(
    /** @type { GetReadyFunction } */
    ( target ) => {
      setReadyTaskIndex( ( readyTaskIndex ) => {
        readyTaskIndex[ target ] = true
        return { ...readyTaskIndex }
      } )
    }, [] )

  useEffect( () => {
    if( appLoader.isHidden ) { return }
    let isReady = true
    for( const task of taskList ) {
      const isTaskReady = readyTaskIndex[ task ] ?? false
      isReady &&= isTaskReady
      if( !isReady ) { break }
    }
    if( isReady ) { appLoader.hide() }
  }, [ appLoader, readyTaskIndex, taskList ] )

  return getReady

}
