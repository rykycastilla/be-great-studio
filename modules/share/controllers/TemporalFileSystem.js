import * as FileSystem from 'expo-file-system'

/**
 * @import { FileExistenceCallback, TemporalFilesService } from '../services/TemporalFilesService'
 */

/**
 * @implements { TemporalFilesService }
 */
export class TemporalFileSystem {

  /** @private */ static tempFilesIdTop = 0
  /** @private */ static BASE64_PATTERN = /^data:([^/]+)\/([^;]+);base64,/

  /**
   * @private
   * @param { string } data
   * @returns { Base64File }
   */
  processFile( data ) {
    const match = TemporalFileSystem.BASE64_PATTERN.exec( data ) ?? []
    const prefix = match[ 0 ] ?? ''
    const extension = match[ 2 ] ?? ''
    const content = data.replace( prefix, '' )
    return { extension, content }
  }

  /**
   * @private
   * @param { string } ext  File extension
   * @returns { string }
   */
  genPath( ext ) {
    const tempFileId = TemporalFileSystem.tempFilesIdTop++
    return `${ FileSystem.cacheDirectory }temp-${ tempFileId }.${ ext }`
  }

  /**
   * @public
   * @param { string } data
   * @param { FileExistenceCallback } callback
   */
  async use( data, callback ) {
    // Creating temp file
    const { extension, content } = this.processFile( data )
    const path = this.genPath( extension )
    await FileSystem.writeAsStringAsync( path, content, { encoding:FileSystem.EncodingType.Base64 } )
    // Using temp file within callback context
    try { await callback( path ) }
    // Erasing temp file
    finally { await FileSystem.deleteAsync( path, { idempotent:true } ) }
  }

}

/**
 * @typedef { object } Base64File
 * @property { string } extension
 * @property { string } content
 */
