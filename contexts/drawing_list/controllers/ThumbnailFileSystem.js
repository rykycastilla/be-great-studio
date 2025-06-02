import * as FileSystem from 'expo-file-system'

/**
 * @import { ThumbnailService } from '../services'
 */

/**
 * @implements { ThumbnailService }
 */
export class ThumbnailFileSystem {

  /** @readonly */ static BASE64_PREFIX = 'data:image/png;base64,'

  /**
   * @private
   * @param { string } path
   * @returns { Promise<boolean> }
   */
  async checkFileExists( path ) {
    try {
      const fileInfo = await FileSystem.getInfoAsync( path )
      return fileInfo.exists
    }
    catch {
      return false
    }
  }

  /**
   * @public
   * @param { string } path
   * @returns { Promise<string|null> }
   */
  async loadContent( path ) {
    const fileExists = await this.checkFileExists( path )
    if( fileExists ) {
      const data = await FileSystem.readAsStringAsync(
        path, { encoding:FileSystem.EncodingType.Base64 },
      )
      return `${ ThumbnailFileSystem.BASE64_PREFIX }${ data }`
    }
    else {
      return null
    }
  }

  /**
   * @public
   * @param { string } path
   */
  async delete( path ) {
    await FileSystem.deleteAsync( path, { idempotent:true } )
  }

  /**
   * @public
   * @param { string } fileName
   * @param { number } timeStamp
   * @param { string } base64
   * @returns { Promise<string> }
   */
  async save( fileName, timeStamp, base64 ) {
    const path = `${ FileSystem.documentDirectory }thumb-${ fileName }-${ timeStamp }.png`
    const data = base64.replace( ThumbnailFileSystem.BASE64_PREFIX, '' )  // Deleting base64 uri data
    await FileSystem.writeAsStringAsync( path, data, { encoding:FileSystem.EncodingType.Base64 } )
    return path
  }

}
