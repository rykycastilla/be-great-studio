import { ExpoSharingMenu } from './ExpoSharingMenu'
import { SharingService } from '../services/SharingService'
import { TemporalFileSystem } from './TemporalFileSystem'

/**
 * @abstract
 */
export class SharingFactory {

  /**
   * Create an `SharingService` instance ready to be used across the system
   * @public
   * @returns { SharingService }
   */
  static createInstance() {
    const temporalFilesService = new TemporalFileSystem()
    const sharingMenuService = new ExpoSharingMenu()
    return new SharingService( temporalFilesService, sharingMenuService )
  }

}
