import { DrawingListContext } from '../context'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDrawingRepository } from '../hooks/drawing_repository'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { Drawing } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } DrawingListProviderProps
 * @property { ReactElement[] | ReactElement } [ children ]
 * @property { () => void } [ onLoad ]
 */

/**
 * @param { DrawingListProviderProps } props
 * @returns { ReactElement }
 */
const DrawingListProvider = ( props ) => {

  const { children, onLoad } = props
  const [ viewMode, setViewMode, requestingViewMode ] = useStorageState( /** @type { 'grid' | 'list' } */ ( 'grid' ), 'view-mode' )
  const [ isSelectionMode, setIsSelectionMode ] = useState( false )
  const [ selectionList, setSelectionList ] = useState( /** @type { Set<string> } */ ( new Set() ) )
  const [ drawingList, setDrawingList ] = useState( /** @type { Drawing[] } */ ( [] ) )
  const drawingRepository = useDrawingRepository()

  // Reset selection list on mode changing
  useEffect( () => {
    setSelectionList( new Set() )
    }, [ isSelectionMode ] )  // eslint-disable-line

  // Loading saved drawings
  const requestingList = useMemo( () => {
    const requestingList = drawingRepository.requestAll()
    requestingList.then( ( drawingList ) => setDrawingList( drawingList ) )
    return requestingList
  }, [ drawingRepository ] )

  // Loading Drawing list provider data
  const onLoadDrawingList = useCallback( async() => {
    await requestingViewMode
    await requestingList
    if( onLoad !== undefined ) { onLoad() }
  }, [ requestingViewMode, requestingList, onLoad ] )

  useEffect( () => {
    onLoadDrawingList()
  }, [ onLoadDrawingList ] )

  // Saving new drawings
  const saveDrawing = useCallback(
    /** @type { ( drawing:Drawing, data:string ) => Promise<void> } */
    async( drawing, data ) => {
      await drawingRepository.save( drawing, data )
      const drawingList = await drawingRepository.requestAll()
      setDrawingList( drawingList )
    }, [ drawingRepository ] )

  // Updating properties of a specific drawing
  const updateDrawing = useCallback(
    /** @type { ( drawing:Drawing, newProperties:Partial<Drawing> ) => Promise<void> } */
    async( drawing, newProperties ) => {
      await drawingRepository.update( drawing, newProperties )
      const drawingList = await drawingRepository.requestAll()
      setDrawingList( drawingList )
    }, [ drawingRepository ] )

  const duplicateDrawing = useCallback(
    /** @type { ( drawing:Drawing ) => Promise<void> } */
    async( drawing ) => {
      await drawingRepository.duplicate( drawing )
      const drawingList = await drawingRepository.requestAll()
      setDrawingList( drawingList )
    }, [ drawingRepository ] )

  const removeDrawing = useCallback(
    /** @type { ( drawing:Drawing ) => Promise<void> } */
    async( drawing ) => {
      await drawingRepository.remove( drawing )
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
      value={
        {
          viewMode,
          setViewMode,
          isSelectionMode,
          setIsSelectionMode,
          selectionList,
          setSelectionList,
          drawingList,
          saveDrawing,
          updateDrawing,
          duplicateDrawing,
          removeDrawing,
          loadDrawingThumbnail,
        }
      }>
      { children }
    </DrawingListContext.Provider>
  )

}

export default DrawingListProvider
