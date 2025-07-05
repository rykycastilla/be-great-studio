import * as Sharing from 'expo-sharing'

/**
 * @import { SharingMenuService } from '../services/SharingMenuService'
 */

/**
 * @implements { SharingMenuService }
 */
export class ExpoSharingMenu {

  /**
   * @public
   * @param { string } file
   */
  async launch( file ) {
    await Sharing.shareAsync( file )
  }

}
