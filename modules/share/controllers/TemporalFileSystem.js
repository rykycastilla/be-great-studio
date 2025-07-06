import * as FileSystem from 'expo-file-system'

/**
 * @import { FileExistenceCallback, TemporalFilesService } from '../services/TemporalFilesService'
 */

/**
 * @implements { TemporalFilesService }
 */
export class TemporalFileSystem {

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
   * @param { string } name
   * @param { string } ext  File extension
   * @returns { string }
   */
  genPath( name, ext ) {
    return `${ FileSystem.cacheDirectory }${ name }.${ ext }`
  }

  /**
   * @public
   * @param { string } data
   * @param { string } name
   * @param { FileExistenceCallback } callback
   */
  async use( data, name, callback ) {
    // Creating temp file
    const { extension, content } = this.processFile( data )
    const path = this.genPath( name, extension )
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
