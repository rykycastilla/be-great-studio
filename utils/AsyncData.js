/**
 * @template T
 */
export class AsyncData {

  /** @private @readonly */ loadingFirstValue
  /** @private */ resolveFirstValue = /** @type { ( value:T ) => void } */
    ( /** @type { unknown } */ ( undefined ) )

  /** @private */ assigned = false
  #value = /** @type { T } */ ( undefined )

  constructor() {
    this.loadingFirstValue = new Promise( ( resolve ) => {
      this.resolveFirstValue = resolve
    } )
  }

  /**
   * @private
   * @returns { Promise<T> }
   */
  async getValue() {
    if( this.assigned ) { return this.#value }
    else { return this.loadingFirstValue }
  }

  /**
   * @public
   * @param { T } value
   */
  setValue( value ) {
    this.#value = value
    if( !this.assigned ) { this.resolveFirstValue( value ) }
    this.assigned = true
  }

  /**
   * @returns { Promise<T> }
   */
  get value() {
    return this.getValue()
  }

}
