/**
 * @import { Group } from './Group'
 * @import { GroupConstructor } from './GroupConstructor'
 * @import { InternalGroup } from './InternalGroup'
 * @import { SharingMenuService } from './SharingMenuService'
 * @import { TemporalFilesService } from './TemporalFilesService'
 */

export class SharingService {

  /** @private @readonly */ temporalFilesService
  /** @private @readonly */ sharingMenuService
  /** @private @readonly */ Group

  /**
   * @param { TemporalFilesService } temporalFilesService
   * @param { SharingMenuService } sharingMenuService
   * @param { GroupConstructor } Group
   */
  constructor( temporalFilesService, sharingMenuService, Group ) {
    this.temporalFilesService = temporalFilesService
    this.sharingMenuService = sharingMenuService
    this.Group = Group
  }

  /**
   * Create Groups object to incorporate many files to share
   * @public
   * @returns { Group }
   */
  createGroup() {
    return new this.Group()
  }

  /**
   * Takes Base64 data and share it using the default system interface
   * @overload
   * @param { string } name
   * @param { string } data
   * @returns { Promise<void> }
   */

  /**
   * Takes a Group of files to be shared
   * @overload
   * @param { Group } group
   * @returns { Promise<void> }
   */

  /**
   * @public
   * @param { string | Group } first
   * @param { string } [ second ]
   * @returns { Promise<void> }
   */
  async share( first, second ) {
    if( typeof first === 'string' ) { await this.shareSingle( first, /** @type { string } */ ( second ) ) }
    else { await this.shareGroup( first ) }
  }

  /**
   * @private
   * @param { string } name
   * @param { string } data
   */
  async shareSingle( name, data ) {
    await this.temporalFilesService.use( data, name, async( filePath ) => {
      await this.sharingMenuService.launch( filePath )
    } )
  }

  /**
   * @private
   * @param { Group } group
   */
  async shareGroup( group ) {
    const internalGroup = /** @type { InternalGroup } */ ( group )
    const { name } = internalGroup
    const data = await internalGroup.getData()
    await this.shareSingle( name, data )
  }

}
