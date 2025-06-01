/**
 * @import { Drawing } from '../models'
 * @import { DrawingDTO } from './DrawingDTO'
 */

export class DrawingMapper {

  /**
   * @public
   * @param { DrawingDTO } dto
   * @returns { Drawing }
   */
  toModel( dto ) {
    const { id, name, thumbnail, last_modified } = dto
    // Converting milliseconds to a JS Date
    return { id, name, thumbnail, lastModified:new Date( last_modified ) }
  }

  /**
   * @public
   * @param { Drawing } model
   * @returns { DrawingDTO }
   */
  toDTO( model ) {
    const { id, name, thumbnail, lastModified } = model
    const last_modified = lastModified.getTime()
    return { id, name, thumbnail, last_modified }
  }

}
