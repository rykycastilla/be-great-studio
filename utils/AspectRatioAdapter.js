import { calcAspectRatio } from '@/utils/calc_aspect_ratio'

/**
 * @abstract
 */
export class AspectRatioAdapter {

  /**
   * Calculates `[ width, height ]` using the aspect ratio from a `reference`.
   * The function only reduces the reference value for the required side
   * to adapt its aspect ratio
   * @public
   * @param { number } reference
   * @param { string } aspectRatio
   * @returns { [ number, number ] }
   */
  static adapt( reference, aspectRatio ) {
    const aspectValue = calcAspectRatio( aspectRatio )
    if( aspectValue < 1 ) { return [ reference * aspectValue, reference ] }
    return [ reference, reference / aspectValue ]
  }

  /**
   * Calculates the height based on width value using the provided aspect ratio
   * @param { number } width
   * @param { string } aspectRatio
   * @returns { number }
   */
  static calcHeight( width, aspectRatio ) {
    const aspectValue = calcAspectRatio( aspectRatio )
    return width / aspectValue
  }

}
