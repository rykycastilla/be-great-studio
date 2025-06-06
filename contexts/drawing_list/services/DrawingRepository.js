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
   * @param { Drawing } drawing
   * @returns { Promise<string|null> }
   */
  loadThumbnail( drawing ) {
    const { thumbnail } = drawing
    return this.thumbnailService.loadContent( thumbnail )
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
   * @public
   * @param { Drawing } drawing
   * @param { string } data
   */
  async save( drawing, data ) {
    const { id, name, thumbnail:oldThumbnail } = drawing
    const lastModified = Date.now()
    const thumbnail = await this.thumbnailService.save( id, lastModified, data )
    if( oldThumbnail !== '' ) { await this.thumbnailService.delete( oldThumbnail ) }
    await this.drawingDAO.saveItem( { id, name, thumbnail, last_modified:lastModified } )
  }

  /**
   * @public
   * @param { Drawing } drawing
   */
  async remove( drawing ) {
    const { thumbnail } = drawing
    const dto = this.mapper.toDTO( drawing )
    await this.drawingDAO.removeItem( dto )
    await this.thumbnailService.delete( thumbnail )
  }

}
