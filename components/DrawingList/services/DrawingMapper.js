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
    const { id, name, thumbnail, lastModified } = dto
    // Converting milliseconds to a JS Date
    return { id, name, thumbnail, lastModified:new Date( lastModified ) }
  }

}
