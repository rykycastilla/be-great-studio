import imageConverter from '@/assets/browser/ImageConverter.es6'
import main from '@/assets/browser/main.es6'
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
  /** @private @readonly */ browser = new OffscreenBrowser( imageConverter, main )

  /**
   * @private
   */
  constructor() {}

  /**
   * @public
   * @param { string } imageData
   * @param { number } resolution
   * @returns { Promise<string> }
   */
  convert( imageData, resolution ) {
    return this.browser.call( 'prepare-png', { data:imageData, resolution } )
  }

  /**
   * @public
   * @returns { ImageConverterBS }
   */
  static getInstance() {
    if( ImageConverterBS.instance === null ) { ImageConverterBS.instance = new ImageConverterBS() }
    return ImageConverterBS.instance
  }

}
