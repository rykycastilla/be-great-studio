import { AsyncStorageConfigDAO } from '@/modules/config/controllers'
import { ConfigRepository } from '@/modules/config/services'
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
    const configDAO = new AsyncStorageConfigDAO()
    const configRepository = new ConfigRepository( configDAO )
    return new DrawingRepository( drawingDAO, thumbnailService, genId, configRepository )
  }, [] )
}
