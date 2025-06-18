import * as FileSystem from 'expo-file-system'

/**
 * @import { ThumbnailDAO } from '../services'
 */

/**
 * @implements { ThumbnailDAO }
 */
export class ThumbnailFileSystemDAO {

  /** @readonly */ static BASE64_PREFIX = 'data:image/png;base64,'

  /**
   * @param { string } fileName
   * @param { number } timeStamp
   * @returns { string }
   */
  resolvePath( fileName, timeStamp ) {
    return `${ FileSystem.documentDirectory }thumb-${ fileName }-${ timeStamp }.png`
  }

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
   * @param { string } id
   * @param { number } timeStamp
   * @returns { Promise<string|null> }
   */
  async get( id, timeStamp ) {
    const path = this.resolvePath( id, timeStamp )
    const fileExists = await this.checkFileExists( path )
    if( fileExists ) {
      const data = await FileSystem.readAsStringAsync(
        path, { encoding:FileSystem.EncodingType.Base64 },
      )
      return `${ ThumbnailFileSystemDAO.BASE64_PREFIX }${ data }`
    }
    else {
      return null
    }
  }

  /**
   * @public
   * @param { string } id
   * @param { number } timeStamp
   */
  async delete( id, timeStamp ) {
    const path = this.resolvePath( id, timeStamp )
    await FileSystem.deleteAsync( path, { idempotent:true } )
  }

  /**
   * @public
   * @param { string } id
   * @param { number } timeStamp
   * @param { string } base64
   * @returns { Promise<string> }
   */
  async save( id, timeStamp, base64 ) {
    const path = this.resolvePath( id, timeStamp )
    const data = base64.replace( ThumbnailFileSystemDAO.BASE64_PREFIX, '' )  // Deleting base64 uri data
    await FileSystem.writeAsStringAsync( path, data, { encoding:FileSystem.EncodingType.Base64 } )
    return path
  }

  /**
   * @public
   * @param { string } from
   * @param { string } fileName
   * @param { number } timeStamp
   * @returns { Promise<string> }
   */
  async clone( from, fileName, timeStamp ) {
    const to = this.resolvePath( fileName, timeStamp )
    await FileSystem.copyAsync( { from, to } )
    return to
  }

}
