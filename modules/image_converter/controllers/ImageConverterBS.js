import ByteStreamUtility from '@/assets/browser/BGPX/ByteStreamUtility.es6'
import bgpxToBase64 from '@/assets/browser/BGPX/bgpx_to_base64.es6'
import BGPX from '@/assets/browser/BGPX/index.es6'
import constants from '@/assets/browser/BGPX/constants.es6'
import convert from '@/assets/browser/BGPX/convert.es6'
import encode from '@/assets/browser/BGPX/encode.es6'
import ImageUtils from '@/assets/browser/ImageUtils.es6'
import main from '@/assets/browser/main.es6'
import PNG from '@/assets/browser/PNG.es6'
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
    BGPX, ImageUtils, PNG, ByteStreamUtility, bgpxToBase64, constants, convert, encode, main,
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
      const [ name, aspectRatio, date ] = /** @type { [ String, String, String, number ] } */ ( restArgs )
      dataConverted = await this.browser.call( 'convert-bgpx', { data, name, aspectRatio, date } )
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
