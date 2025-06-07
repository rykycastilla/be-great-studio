import { DrawingMapper } from './DrawingMapper'
import { NameService } from './NameService'

/**
 * @import { Drawing } from '../models'
 * @import { DrawingDAO } from './DrawingDAO'
 * @import { ThumbnailService } from './ThumbnailService'
 */

export class DrawingRepository {

  /** @private @readonly */ drawingDAO
  /** @private @readonly */ thumbnailService
  /** @private @readonly */ genId
  /** @private @readonly */ mapper
  /** @private @readonly */ nameService

  /**
   * @param { DrawingDAO } drawingDAO
   * @param { ThumbnailService } thumbnailService
   * @param { () => string } genId
   */
  constructor( drawingDAO, thumbnailService, genId ) {
    this.drawingDAO = drawingDAO
    this.thumbnailService = thumbnailService
    this.genId = genId
    this.mapper = new DrawingMapper()
    this.nameService = new NameService()
  }

  /**
   * @private
   * @returns { Promise<Set<string>> }
   */
  async getNames() {
    const drawingList = await this.requestAll()
    /** @type { Set<string> } */ const nameList = new Set()
    for( const drawing of drawingList ) {
      nameList.add( drawing.name )
    }
    return nameList
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
  async duplicate( drawing ) {
    const dto = this.mapper.toDTO( drawing )
    const { name, thumbnail, last_modified } = dto
    // Creating new (cloned) data
    const id = this.genId()
    const thumbnailClone = await this.thumbnailService.clone( thumbnail, id, last_modified )
    const nameList = await this.getNames()
    const autoNumName = this.nameService.autoNum( name, nameList )
    // Using new data for duplicated structure
    dto.id = id
    dto.name = autoNumName
    dto.thumbnail = thumbnailClone
    await this.drawingDAO.saveItem( dto )
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
