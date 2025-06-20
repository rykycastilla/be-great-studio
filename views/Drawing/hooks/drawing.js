import { useDrawingList } from '@/contexts/drawing_list'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { useSettings } from '@/contexts/settings'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 */

/**
 * @typedef { Drawing & {
 * setName( name:string ): void
 * setResolution( resolution:number ): void
 * setAspectRatio( aspectRatio:string ): void
 * } } InteractiveDrawing
 */

/**
 * @param { Drawing } drawing
 * @returns { Drawing }
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
    const { id, thumbnail, resolution, aspectRatio, lastModified } = drawing
    return { id, name, thumbnail, resolution, aspectRatio, lastModified, setName:updateName }
  }, [ updateName, name, JSON.stringify( drawing ) ] )  // eslint-disable-line

}

/**
 * @param { Drawing } drawing
 * @returns { InteractiveDrawing }
 */
function useResolutionSetter( drawing ) {
  const [ resolution, setResolution ] = useState( drawing.resolution )
  return useMemo( () => {
    const interactiveDrawing = /** @type { InteractiveDrawing } */ ( { ...drawing } )
    interactiveDrawing.setResolution = setResolution
    interactiveDrawing.resolution = resolution
    return interactiveDrawing
  }, [ resolution, drawing ] )
}

/**
 * @param { Drawing } drawing
 * @returns { InteractiveDrawing }
 */
function useAspectRatioSetter( drawing ) {
  const [ aspectRatio, setAspectRatio ] = useState( drawing.aspectRatio )
  return useMemo( () => {
    const interactiveDrawing = /** @type { InteractiveDrawing } */ ( { ...drawing } )
    interactiveDrawing.setAspectRatio = setAspectRatio
    interactiveDrawing.aspectRatio = aspectRatio
    return interactiveDrawing
  }, [ aspectRatio, drawing ] )
}

/**
 * Gets the drawing object for the specific route
 * @returns { InteractiveDrawing }
 */
export function useDrawing() {

  const { id } = /** @type { { id:string } } */ ( useLocalSearchParams() )
  const settings = useSettings()
  const { drawingList } = useDrawingList()

  // Getting default resolution
  const defaultResolution = useMemo( () => {
    return settings.resolution
  }, [] )  // eslint-disable-line

  // Getting default resolution
  const defaultAspectRatio = useMemo( () => {
    return settings.aspectRatio
    }, [] )  // eslint-disable-line

  // Searching saved drawing
  const savedDrawing = useMemo( () => {
    for( const drawing of drawingList ) {
      if( drawing.id === id ) { return drawing }
    }
  }, [ id, drawingList ] )

  // Creating drawing if it doesn't exists
  const drawing = savedDrawing ?? {
    id,
    name:'New Drawing',
    thumbnail:'',
    resolution: defaultResolution,
    aspectRatio: defaultAspectRatio,
    lastModified: new Date(),
  }

  let drawingWithSetter = useNameSetter( drawing )
  drawingWithSetter = useResolutionSetter( drawingWithSetter )
  drawingWithSetter = useAspectRatioSetter( drawingWithSetter )
  return /** @type { InteractiveDrawing } */ ( drawingWithSetter )

}
