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

}
