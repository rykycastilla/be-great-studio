import { NameService } from './NameService'

/**
 * @import { ConfigRepository } from '@/modules/config/services'
 * @import { Drawing } from '../models/Drawing'
 * @import { DrawingRepository } from './DrawingRepository'
 * @import { DrawingMapper } from './DrawingMapper'
 * @import { ImageConverter } from '@/modules/image_converter/services'
 * @import { SharingService } from '@/modules/share/services'
 * @import { ThumbnailDAO } from './ThumbnailDAO'
*/

export class DrawingService {

  /** @private @readonly */ drawingRepository
  /** @private @readonly */ configRepository
  /** @private @readonly */ thumbnailDAO
  /** @private @readonly */ drawingMapper
  /** @private @readonly */ genId
  /** @private @readonly */ nameService
  /** @private @readonly */ sharingService
  /** @private @readonly */ imageConverter

  /**
   * @param { DrawingRepository } drawingRepository
   * @param { ConfigRepository } configRepository
   * @param { ThumbnailDAO } thumbnailDAO
   * @param { DrawingMapper } drawingMapper
   * @param { SharingService } sharingService
   * @param { ImageConverter } imageConverter
   * @param { () => string } genId
   */
  constructor( drawingRepository, configRepository, thumbnailDAO, drawingMapper, sharingService, imageConverter, genId ) {
    this.drawingRepository = drawingRepository
    this.configRepository = configRepository
    this.thumbnailDAO = thumbnailDAO
    this.drawingMapper = drawingMapper
    this.genId = genId
    this.nameService = new NameService()
    this.sharingService = sharingService
    this.imageConverter = imageConverter
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
   * Save the drawing and its image data.
   * `lastUpdate` property is automatically updated using it
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
    const dto = this.drawingMapper.toDTO( drawing )
    // Creating new (cloned) data
    dto.id = this.genId()
    const thumbnailData = await this.thumbnailDAO.get( drawing.id, dto.last_modified ) ?? ''
    const nameList = await this.getNames()
    dto.name = this.nameService.autoNum( drawing.name, nameList )
    const newDrawing = this.drawingMapper.toModel( dto )
    // Using new data for duplicated structure
    await this.save( newDrawing, thumbnailData )
    await this.configRepository.transfer( drawing.id, newDrawing.id )
  }

  /**
   * Share a drawing to another application
   * @public
   * @param { Drawing } drawing
   * @param { number } toResolution
   */
  async share( drawing, toResolution ) {
    const { name } = drawing
    // Extracting image data
    const { id, last_modified } = this.drawingMapper.toDTO( drawing )
    let data = await this.thumbnailDAO.get( id, last_modified )
    if( data === null ) { return }
    // Converting image
    data = await this.imageConverter.convert( data, toResolution )
    await this.sharingService.share( name, data )
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
