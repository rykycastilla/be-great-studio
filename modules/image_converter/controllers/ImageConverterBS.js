import BGPX from '@/assets/browser/BGPX.es6'
import BufferedURL from '@/assets/browser/BufferedURL.es6'
import ImageUtils from '@/assets/browser/ImageUtils.es6'
import main from '@/assets/browser/main.es6'
import PNG from '@/assets/browser/PNG.es6'
import PngMetadata from '@/assets/browser/PngMetadata.es6'
import { Format } from '../models/Format'
import { OffscreenBrowser } from '@/utils/OffscreenBrowser'

/**
 * @import { ImageConverter } from '../services'
 */

/**
 * Image converter browser service is created to use an offscreen browser env to handle images format
 * @implements { ImageConverter }
 */
export class ImageConverterBS {

  /** @private @type { ImageConverterBS | null } */ static instance = null
  /** @private @readonly */ browser = new OffscreenBrowser(
    BGPX, BufferedURL, ImageUtils, PNG, PngMetadata, main,
  )

  /**
   * @private
   */
  constructor() {}

  /**
   * @public
   * @param { [ string, Format, ...unknown[] ] } args
   * @returns { Promise<string> }
   */
  async convert( ...args ) {
    const [ data, format, ...restArgs ] = args
    let dataConverted = ''  // Never must be returned this value
    if( format === Format.PNG  ) {
      const [ resolution ] = /** @type { [ number ] } */ ( restArgs )
      dataConverted = await this.browser.call( 'prepare-png', { data, resolution } )
    }
    else if( format === Format.BGPX ) {
      const [ name, resolution, aspectRatio, date ] = /** @type { [ string, number, string, string, number ] } */ ( restArgs )
      dataConverted = await this.browser.call( 'convert-bgpx', { data, name, resolution, aspectRatio, date } )
    }
    return dataConverted
  }

  /**
   * @public
   * @returns { ImageConverter }
   */
  static getInstance() {
    if( ImageConverterBS.instance === null ) { ImageConverterBS.instance = new ImageConverterBS() }
    return ImageConverterBS.instance
  }

}
