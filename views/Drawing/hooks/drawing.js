import { useDrawingList } from '@/components/DrawingList'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'

/**
 * @import { Drawing } from '@/components/DrawingList'
 */

/**
 * @typedef { Drawing & { setName( name:string ): void } } InteractiveDrawing
 */

/**
 * @param { Drawing } drawing
 * @returns { InteractiveDrawing }
 */
export function useNameSetter( drawing ) {

  const [ name, setName ] = useState( drawing.name )
  const { updateDrawing } = useDrawingList()

  // Updating name and name state (cached)
  const updateName = useCallback(
    /** @type { ( name:string ) => void } */
    ( name ) => {
      setName( name )
      // Only updating database if the instance was already saved
      if( drawing.thumbnail !== '' ) { updateDrawing( drawing, { name } ) }
    }, [ updateDrawing, JSON.stringify( drawing ) ] )  // eslint-disable-line

  // Using name updater and cached name
  return useMemo( () => {
    const { id, thumbnail, lastModified } = drawing
    return { id, name, thumbnail, lastModified, setName:updateName }
  }, [ updateName, name, JSON.stringify( drawing ) ] )  // eslint-disable-line

}

/**
 * Gets the drawing object for the specific route
 * @returns { InteractiveDrawing }
 */
export function useDrawing() {

  const { id } = /** @type { { id:string } } */ ( useLocalSearchParams() )
  const { drawingList } = useDrawingList()

  // Searching saved drawing
  const savedDrawing = useMemo( () => {
    for( const drawing of drawingList ) {
      if( drawing.id === id ) { return drawing }
    }
  }, [ id, drawingList ] )

  // Creating drawing if it doesn't exists
  const drawing = savedDrawing ?? { id, name:'New Drawing', thumbnail:'', lastModified:new Date() }
  return useNameSetter( drawing )

}
