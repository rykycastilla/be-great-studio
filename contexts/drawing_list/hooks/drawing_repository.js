import { DrawingRepository } from '../services'
import { genId } from '@/utils/gen_id'
import { SqliteDrawingDAO, ThumbnailFileSystem } from '../controllers'
import { useMemo } from 'react'

/**
 * @returns { DrawingRepository }
 */
export function useDrawingRepository() {
  return useMemo( () => {
    const drawingDAO = new SqliteDrawingDAO()
    const thumbnailService = new ThumbnailFileSystem()
    return new DrawingRepository( drawingDAO, thumbnailService, genId )
  }, [] )
}
