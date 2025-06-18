import { AsyncStorageConfigDAO } from '@/modules/config/controllers'
import { ConfigRepository } from '@/modules/config/services'
import { DrawingMapper } from '../services/DrawingMapper'
import { DrawingRepository } from '../services/DrawingRepository'
import { DrawingService } from '../services/DrawingService'
import { genId } from '@/utils/gen_id'
import { SqliteDrawingDAO } from '../controllers/SqliteDrawingDAO'
import { ThumbnailFileSystemDAO } from '../controllers/ThumbnailFileSystemDAO'
import { ThumbnailService } from '../services/ThumbnailService'
import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * @import { Drawing } from '../models/Drawing'
 */

/**
 * @typedef { object } DrawingControllerResult
 * @property { Drawing[] } drawingList
 * @property { Promise<void> } loadingList
 * @property { ( drawing:Drawing, data:string ) => Promise<void> } saveDrawing
 * @property { ( drawing:Drawing, newProperties:Partial<Drawing> ) => Promise<void> } updateDrawing
 * @property { ( drawing:Drawing ) => Promise<void> } duplicateDrawing
 * @property { ( drawing:Drawing ) => Promise<void> } removeDrawing
 * @property { ( drawing:Drawing ) => Promise<string|null> } loadDrawingThumbnail
 */

/**
 * @returns { DrawingControllerResult }
 */
export function useDrawingController() {

  const [ drawingList, setDrawingList ] = useState( /** @type { Drawing[] } */ ( [] ) )

  const thumbnailDAO = useMemo( () => {
    return new ThumbnailFileSystemDAO()
  }, [] )

  const drawingMapper = useMemo( () => {
    return new DrawingMapper()
  }, [] )

  const thumbnailService = useMemo( () => {
    return new ThumbnailService( thumbnailDAO, drawingMapper )
  }, [ thumbnailDAO, drawingMapper ] )

  const drawingService = useMemo( () => {
    const drawingDAO = new SqliteDrawingDAO()
    const drawingRepository = new DrawingRepository( drawingDAO, thumbnailDAO, drawingMapper )
    const configDAO = new AsyncStorageConfigDAO()
    const configRepository = new ConfigRepository( configDAO )
    return new DrawingService(
      drawingRepository, configRepository, thumbnailDAO, drawingMapper, genId,
    )
  }, [ thumbnailDAO, drawingMapper ] )

  // Collecting garbage
  useEffect( () => {
    drawingService.collectConfigGarbage()
  }, [ drawingService ] )

  const updateDrawingList = useCallback( async() => {
    const drawingList = await drawingService.requestAll()
    setDrawingList( drawingList )
  }, [ drawingService ] )

  const loadingList = useMemo( () => {
    return updateDrawingList()
  }, [ updateDrawingList ] )

  // Saving new drawings
  const saveDrawing = useCallback(
    /** @type { ( drawing:Drawing, data:string ) => Promise<void> } */
    async( drawing, data ) => {
      await drawingService.save( drawing, data )
      await updateDrawingList()
    }, [ drawingService, updateDrawingList ] )

  // Updating properties of a specific drawing
  const updateDrawing = useCallback(
    /** @type { ( drawing:Drawing, newProperties:Partial<Drawing> ) => Promise<void> } */
    async( drawing, newProperties ) => {
      await drawingService.update( drawing, newProperties )
      await updateDrawingList()
    }, [ drawingService, updateDrawingList ] )

  const duplicateDrawing = useCallback(
    /** @type { ( drawing:Drawing ) => Promise<void> } */
    async( drawing ) => {
      await drawingService.duplicate( drawing )
      await updateDrawingList()
    }, [ drawingService, updateDrawingList ] )

  const removeDrawing = useCallback(
    /** @type { ( drawing:Drawing ) => Promise<void> } */
    async( drawing ) => {
      await drawingService.remove( drawing )
      await updateDrawingList()
    }, [ drawingService, updateDrawingList ] )

  const loadDrawingThumbnail = useCallback(
    /** @type { ( drawing:Drawing ) => Promise<string|null> } */
    ( drawing ) => {
      return thumbnailService.loadThumbnail( drawing )
    }, [ thumbnailService ] )

  return {
    drawingList, loadingList,
    saveDrawing, updateDrawing, removeDrawing,
    duplicateDrawing,
    loadDrawingThumbnail,
  }

}
