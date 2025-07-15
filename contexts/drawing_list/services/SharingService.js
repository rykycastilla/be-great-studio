import { UniqueIndex } from '@/utils/UniqueIndex'

/**
 * @import { Drawing } from '../models/Drawing'
 * @import { DrawingDTO } from './DrawingDTO'
 * @import { DrawingMapper } from './DrawingMapper'
 * @import { SharingService as SystemSharingService } from '@/modules/share/services'
 * @import { ThumbnailDAO } from './ThumbnailDAO'
 */

export class SharingService {

  /** @private @readonly */ drawingMapper
  /** @private @readonly */ thumbnailDAO
  /** @private @readonly */ systemSharingService

  /**
   * @param { DrawingMapper } drawingMapper
   * @param { ThumbnailDAO } thumbnailDAO
   * @param { SystemSharingService } systemSharingService
   */
  constructor( drawingMapper, thumbnailDAO, systemSharingService ) {
    this.drawingMapper = drawingMapper
    this.thumbnailDAO = thumbnailDAO
    this.systemSharingService = systemSharingService
  }

  /**
   * @private
   * @param { Drawing } drawing
   * @param { ( data:string, drawing:DrawingDTO ) => Promise<string> } [ convert ]
   * @returns { Promise<{ id:string, name:string, data:string }|null> }
   */
  async prepareDrawingToShare( drawing, convert ) {
    const { name } = drawing
    // Extracting image data
    const dto = this.drawingMapper.toDTO( drawing )
    const { id, last_modified } = dto
    let data = await this.thumbnailDAO.get( id, last_modified )
    if( data === null ) { return null }
    // Converting image
    if( convert !== undefined ) { data = await convert( data, dto ) }
    return { id, name, data }
  }

  /**
   * Share a drawing to another application
   * @overload
   * @param { Drawing } drawing
   * @param { ( data:string, drawing:DrawingDTO ) => Promise<string> } [ convert ]
   * @returns { Promise<void> }
   */

  /**
   * Share a group of drawings to another application
   * @overload
   * @param { Drawing[] } drawingList
   * @param { ( data:string, drawing:DrawingDTO ) => Promise<string> } [ convert ]
   * @returns { Promise<void> }
   */

  /**
   * @public
   * @param { Drawing | Drawing[] } first
   * @param { ( data:string, drawing:DrawingDTO ) => Promise<string> } [ second ]
   */
  async share( first, second ) {
    if( first instanceof Array ) { return this.shareMultiple( first, second ) }
    return this.shareSingle( first, second )
  }

  /**
   * @private
   * @param { Drawing[] } drawingList
   * @param { ( data:string, drawing:DrawingDTO ) => Promise<string> } [ convert ]
   */
  async shareMultiple( drawingList, convert ) {
    // `index` handles names collisions using a unique id to sign ocurrences
    /** @type { UniqueIndex<string> } */ const index = new UniqueIndex()
    for( const drawing of drawingList ) {
      const result = await this.prepareDrawingToShare( drawing, convert )
      if( result === null ) { continue }
      const { id, name, data } = result
      // Ensuring name collisions will be avoided
      index.set( id, name, data )
    }
    const group = this.systemSharingService.createGroup()
    index.forEach( ( key, data ) => {
      group.addFile( key, data )
    } )
    await this.systemSharingService.share( group )
  }

  /**
   * @private
   * @param { Drawing } drawing
   * @param { ( data:string, drawing:DrawingDTO ) => Promise<string> } [ convert ]
  */
  async shareSingle( drawing, convert ) {
    const result = await this.prepareDrawingToShare( drawing, convert )
    if( result === null ) { return }
    const { name, data } = result
    await this.systemSharingService.share( name, data )
  }

}
