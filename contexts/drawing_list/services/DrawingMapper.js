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
    const { id, name, thumbnail, resolution, aspect_ratio, last_modified } = dto
    // Converting milliseconds to a JS Date
    return { id, name, thumbnail, resolution, aspectRatio:aspect_ratio, lastModified:new Date( last_modified ) }
  }

  /**
   * @public
   * @param { Drawing } model
   * @returns { DrawingDTO }
   */
  toDTO( model ) {
    const { id, name, thumbnail, resolution, aspectRatio, lastModified } = model
    const last_modified = lastModified.getTime()
    return { id, name, thumbnail, resolution, aspect_ratio:aspectRatio, last_modified }
  }

}
