import { DrawingListContext } from '../context'
import { useCallback, useEffect, useState } from 'react'
import { useDrawingRepository } from '../hooks/drawing_repository'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { Drawing } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } DrawingListProviderProps
 * @property { ReactElement[] | ReactElement } [ children ]
 */

/**
 * @param { DrawingListProviderProps } props
 * @returns { ReactElement }
 */
const DrawingListProvider = ( props ) => {

  const { children } = props
  const [ viewMode, setViewMode ] = useStorageState( /** @type { 'grid' | 'list' } */ ( 'grid' ), 'view-mode' )
  const [ drawingList, setDrawingList ] = useState( /** @type { Drawing[] } */ ( [] ) )
  const drawingRepository = useDrawingRepository()

  // Loading saved drawings
  useEffect( () => {
    const requestingList = drawingRepository.requestAll()
    requestingList.then( ( drawingList ) => setDrawingList( drawingList ) )
  }, [ drawingRepository ] )

  // Saving new drawings
  const saveDrawing = useCallback(
    /** @type { ( drawing:Drawing, data:string ) => Promise<void> } */
    async( drawing, data ) => {
      await drawingRepository.save( drawing, data )
      const drawingList = await drawingRepository.requestAll()
      setDrawingList( drawingList )
    }, [ drawingRepository ] )

  const loadDrawingThumbnail = useCallback(
    /** @type { ( drawing:Drawing ) => Promise<string|null> } */
    ( drawing ) => {
      return drawingRepository.loadThumbnail( drawing )
    }, [ drawingRepository ] )

  return (
    <DrawingListContext.Provider
      value={ { viewMode, setViewMode, drawingList, saveDrawing, loadDrawingThumbnail } }>
      { children }
    </DrawingListContext.Provider>
  )

}

export default DrawingListProvider
