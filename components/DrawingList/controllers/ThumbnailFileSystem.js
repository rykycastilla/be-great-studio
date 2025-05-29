import * as FileSystem from 'expo-file-system'

/**
 * @import { ThumbnailService } from '../services'
 */

/**
 * @implements { ThumbnailService }
 */
export class ThumbnailFileSystem {

  /**
   * @public
   * @param { string } fileName
   * @param { string } base64
   * @returns { Promise<string> }
   */
  async save( fileName, base64 ) {
    const path = `${ FileSystem.documentDirectory }${ fileName }.png`
    await FileSystem.writeAsStringAsync( path, base64, { encoding:FileSystem.EncodingType.Base64 } )
    return path
  }

}
