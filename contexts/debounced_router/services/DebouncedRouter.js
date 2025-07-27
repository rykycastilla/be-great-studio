/**
 * @import { IRouter } from './IRouter'
 */

/**
 * @implements { IRouter }
 */
export class DebouncedRouter {

  /** @private @readonly */ router
  #locked = false

  /**
   * @param { IRouter } router
   */
  constructor( router ) {
    this.router = router
  }

  /**
   * @public
   * @param { string } route
   */
  push( route ) {
    if( this.#locked ) { return }
    this.router.push( route )
    DebouncedRouter.lock( this )
  }

  /**
   * @public
   */
  back() {
    if( this.#locked ) { return }
    this.router.back()
    DebouncedRouter.lock( this )
  }

  /**
   * @public
   * @param { DebouncedRouter } instance
   */
  static lock( instance ) {
    instance.#locked = true
  }

  /**
   * @public
   * @param { DebouncedRouter } instance
   */
  static unlock( instance ) {
    instance.#locked = false
  }

}
