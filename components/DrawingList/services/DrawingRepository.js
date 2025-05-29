import { DrawingMapper } from './DrawingMapper'

/**
 * @import { Drawing } from '../models'
 * @import { DrawingDAO } from './DrawingDAO'
 * @import { ThumbnailService } from './ThumbnailService'
*/

export class DrawingRepository {

  /** @private @readonly */ drawingDAO
  /** @private @readonly */ thumbnailService
  /** @private @readonly */ mapper

  /**
   * @param { DrawingDAO } drawingDAO
   * @param { ThumbnailService } thumbnailService
  */
  constructor( drawingDAO, thumbnailService ) {
    this.drawingDAO = drawingDAO
    this.thumbnailService = thumbnailService
    this.mapper = new DrawingMapper()
  }

  /**
   * @public
   * @returns { Promise<Drawing[]> }
   */
  async requestAll() {
    const drawingDTOList = await this.drawingDAO.readItems()
    /** @type { Drawing[] } */ const drawingList = []
    for( const drawingDTO of drawingDTOList ) {
      const drawing = this.mapper.toModel( drawingDTO )
      drawingList.push( drawing )
    }
    return drawingList
  }

  /**
   * @public
   * @param { Drawing } drawing
   * @param { string } data
   */
  async save( drawing, data ) {
    const { id, name } = drawing
    const lastModified = Date.now()
    const thumbnail = await this.thumbnailService.save( id, data )
    await this.drawingDAO.saveItem( { id, name, thumbnail, lastModified } )
  }

}
