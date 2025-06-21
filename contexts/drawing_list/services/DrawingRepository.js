/**
 * @import { Drawing } from '../models'
 * @import { DrawingDAO } from './DrawingDAO'
 * @import { DrawingMapper } from './DrawingMapper'
 * @import { ThumbnailDAO } from './ThumbnailDAO'
 */

export class DrawingRepository {

  /** @private @readonly */ drawingDAO
  /** @private @readonly */ thumbnailDAO
  /** @private @readonly */ mapper

  /**
   * @param { DrawingDAO } drawingDAO
   * @param { ThumbnailDAO } thumbnailDAO
   * @param { DrawingMapper } mapper
   */
  constructor( drawingDAO, thumbnailDAO, mapper ) {
    this.drawingDAO = drawingDAO
    this.thumbnailDAO = thumbnailDAO
    this.mapper = mapper
  }

  /**
   * @public
   * @returns { Promise<Drawing[]> }
   */
  async requestAll() {
    const drawingList = await this.drawingDAO.readItems()
    return drawingList.map( ( dto ) => this.mapper.toModel( dto ) )
  }

  /**
   * Updates only the specified properties of the drawing
   * @public
   * @param { Drawing } drawing
   * @param { Partial<Drawing> } newProperties
   */
  async update( drawing, newProperties ) {
    const model = Object.assign( {}, drawing )
    Object.assign( model, newProperties )
    const dto = this.mapper.toDTO( model )
    await this.drawingDAO.saveItem( dto )
  }

  /**
   * Save the drawing and its image data.
   * `lastUpdate` property is automatically updated using it
   * @public
   * @param { Drawing } drawing
   * @param { string } data
   */
  async save( drawing, data ) {
    const dto = this.mapper.toDTO( drawing )
    if( dto.thumbnail !== '' ) { await this.thumbnailDAO.delete( dto.id, dto.last_modified ) }
    dto.last_modified = Date.now()
    dto.thumbnail = await this.thumbnailDAO.save( dto.id, dto.last_modified, data )
    await this.drawingDAO.saveItem( dto )
  }

  /**
   * @public
   * @param { Drawing } drawing
   */
  async remove( drawing ) {
    const dto = this.mapper.toDTO( drawing )
    const { id, last_modified } = dto
    await this.drawingDAO.removeItem( dto )
    await this.thumbnailDAO.delete( id, last_modified )
  }

}
