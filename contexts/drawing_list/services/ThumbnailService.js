/**
 * @import { Drawing } from '../models/Drawing'
 * @import { DrawingMapper } from './DrawingMapper'
 * @import { ThumbnailDAO } from './ThumbnailDAO'
 */

export class ThumbnailService {

  /** @private @readonly */ thumbnailDAO
  /** @private @readonly */ drawingMapper

  /**
   * @param { ThumbnailDAO } thumbnailDAO
   * @param { DrawingMapper } drawingMapper
   */
  constructor( thumbnailDAO, drawingMapper ) {
    this.thumbnailDAO = thumbnailDAO
    this.drawingMapper = drawingMapper
  }

  /**
   * @public
   * @param { Drawing } drawing
   * @returns { Promise<string|null> }
   */
  loadThumbnail( drawing ) {
    const { id, last_modified } = this.drawingMapper.toDTO( drawing )
    return this.thumbnailDAO.get( id, last_modified )
  }

}
