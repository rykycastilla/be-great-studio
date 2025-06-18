import { NameService } from './NameService'

/**
 * @import { ConfigRepository } from '@/modules/config/services'
 * @import { Drawing } from '../models/Drawing'
 * @import { DrawingRepository } from './DrawingRepository'
 * @import { DrawingMapper } from './DrawingMapper'
 * @import { ThumbnailDAO } from './ThumbnailDAO'
*/

export class DrawingService {

  /** @private @readonly */ drawingRepository
  /** @private @readonly */ configRepository
  /** @private @readonly */ thumbnailDAO
  /** @private @readonly */ drawingMapper
  /** @private @readonly */ genId
  /** @private @readonly */ nameService

  /**
   * @param { DrawingRepository } drawingRepository
   * @param { ConfigRepository } configRepository
   * @param { ThumbnailDAO } thumbnailDAO
   * @param { DrawingMapper } drawingMapper
   * @param { () => string } genId
   */
  constructor( drawingRepository, configRepository, thumbnailDAO, drawingMapper, genId ) {
    this.drawingRepository = drawingRepository
    this.configRepository = configRepository
    this.thumbnailDAO = thumbnailDAO
    this.drawingMapper = drawingMapper
    this.genId = genId
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
   * @returns { Promise<Drawing[]> }
   */
  requestAll() {
    return this.drawingRepository.requestAll()
  }

  /**
   * Updates only the specified properties of the drawing
   * @public
   * @param { Drawing } drawing
   * @param { Partial<Drawing> } newProperties
   */
  async update( drawing, newProperties ) {
    await this.drawingRepository.update( drawing, newProperties )
  }

  /**
   * @public
   * @param { Drawing } drawing
   * @param { string } data
   */
  async save( drawing, data ) {
    await this.drawingRepository.save( drawing, data )
  }

  /**
   * @public
   * @param { Drawing } drawing
   */
  async remove( drawing ) {
    await this.drawingRepository.remove( drawing )
  }

  /**
   * @public
   * @param { Drawing } drawing
   */
  async duplicate( drawing ) {
    const { last_modified } = this.drawingMapper.toDTO( drawing )
    // Creating new (cloned) data
    const id = this.genId()
    const thumbnailData = await this.thumbnailDAO.get( drawing.id, last_modified ) ?? ''
    const nameList = await this.getNames()
    const name = this.nameService.autoNum( drawing.name, nameList )
    /** @type { Drawing } */ const newDrawing = { id, name, thumbnail:'', lastModified:new Date() }
    // Using new data for duplicated structure
    await this.configRepository.transfer( drawing.id, id )
    await this.save( newDrawing, thumbnailData )
  }

  /**
   * @public
   */
  async collectConfigGarbage() {
    const drawingList = await this.requestAll()
    const activeIdList = drawingList.map( ( drawing ) => drawing.id )
    await this.configRepository.collectGarbage( activeIdList )
  }

}
