import JSZip from 'jszip'
import { DateService } from '../services/DateService'

/**
 * @import { InternalGroup } from '../services/InternalGroup'
 */

/**
 * @implements { InternalGroup }
 */
export class ZipGroup {

  /** @private @readonly */ static BASE64_PREFIX_PATTERN = /^data:([^;]+);base64/
  /** @private @readonly */ static BASE64_ZIP_PREFIX = 'data:application/zip;base64,'

  /** @readonly */ name = `BG Images Set ${ DateService.generate() }`
  /** @private @readonly */ zip = new JSZip()

  /**
   * @public
   * @param { string } name
   * @param { string } data  Base64 data url
   */
  addFile( name, data ) {
    const [ prefix, base64 ] = /** @type { [ String, string ] } */ ( data.split( ',' ) )
    const ext = ZipGroup.getExtension( prefix )
    this.zip.file( `${ name }.${ ext }`, base64, { base64:true } )
  }

  /**
   * @public
   * @returns { Promise<string> }
   */
  async getData() {
    const base64 = await this.zip.generateAsync( { type:'base64' } )
    return ZipGroup.BASE64_ZIP_PREFIX + base64
  }

  /**
   * @private
   * @param { string } prefix
   * @returns { string | null }
   */
  static getExtension( prefix ) {
    const match = prefix.match( ZipGroup.BASE64_PREFIX_PATTERN )
    if ( !match ) { return null }
    const mimeType = match[ 1 ]
    if( mimeType === undefined ) { return null }
    const [ , ext ] = /** @type { [ string, string ] } */ ( mimeType.split( '/' ) )
    return ext
  }

}
