import { useCallback, useEffect, useState } from 'react'

/**
 * @typedef { object } SaveHandlerResult
 * @property { boolean } disabled
 * @property { ( savedData:string ) => void } setSavedData
 */

/**
 * Allow to disable (a saver button) automatically when the canvas is saved, until it is modified
 * @param { () => Promise<string|null> } requestImageData
 * @returns { SaveHandlerResult }
 */
export function useSaverHandler( requestImageData ) {

  const [ disabled, setDisabled ] = useState( true )
  const [ savedData, setSavedData ] = useState( /** @type { string | undefined } */ ( undefined ) )

  // Initializing saved data
  const loadDefaultImage = useCallback( async() => {
    /** @type { string | null } */ let data = null
    while( data === null ) {
      data = await requestImageData()
    }
    setSavedData( data )
  }, [ requestImageData ] )

  useEffect( () => {
    if( savedData !== undefined ) { return }
    loadDefaultImage()
  }, [ savedData, loadDefaultImage ] )

  useEffect( () => {
    if( !disabled || ( savedData === undefined ) ) { return }
    // Is disabled & loaded
    const interval = setInterval( async() => {
      const currentImage = await requestImageData()
      if( savedData !== currentImage ) { setDisabled( false ) }
    }, 250 )
    return () => clearInterval( interval )
  }, [ disabled, savedData, requestImageData ] )

  // Indicating was saved (and it dos not need to be saved again)
  useEffect( () => {
    setDisabled( true )
  }, [ savedData ] )

  return { disabled, setSavedData }

}
