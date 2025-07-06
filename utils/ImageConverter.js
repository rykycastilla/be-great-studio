import imageConverter from '@/assets/browser/ImageConverter.es6'
import main from '@/assets/browser/main.es6'
import { OffscreenBrowser } from '@/utils/OffscreenBrowser'

export class ImageConverter {

  /** @private @readonly */ browser = new OffscreenBrowser( imageConverter, main )

  /**
   * @public
   * @param { string } imageData
   * @param { number } resolution
   * @returns { Promise<string> }
   */
  convert( imageData, resolution ) {
    return this.browser.call( 'convert-image', { data:imageData, resolution } )
  }

}
