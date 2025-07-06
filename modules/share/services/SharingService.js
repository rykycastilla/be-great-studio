/**
 * @import { SharingMenuService } from './SharingMenuService'
 * @import { TemporalFilesService } from './TemporalFilesService'
 */

export class SharingService {

  /** @private @readonly */ temporalFilesService
  /** @private @readonly */ sharingMenuService

  /**
   * @param { TemporalFilesService } temporalFilesService
   * @param { SharingMenuService } sharingMenuService
   */
  constructor( temporalFilesService, sharingMenuService ) {
    this.temporalFilesService = temporalFilesService
    this.sharingMenuService = sharingMenuService
  }

  /**
   * Takes Base64 data and share it using the default system interface
   * @public
   * @param { string } name
   * @param { string } data
   */
  async share( name, data ) {
    await this.temporalFilesService.use( data, name, async( filePath ) => {
      await this.sharingMenuService.launch( filePath )
    } )
  }

}
