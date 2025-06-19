
/**
 * A Bidimensional Map structure
 * @template T
 * @template U
 * @template V
 */
export class Table {

  /** @private @readonly @type { Map<T,Map<U,V>> } */ index = new Map()

  /**
   * @public
   * @param { T } keyX
   * @param { U } keyY
   * @param { V } value
   */
  set( keyX, keyY, value ) {
    let indexY = this.index.get( keyX )
    if( indexY === undefined ) {
      indexY = new Map()
      this.index.set( keyX, indexY )
    }
    indexY.set( keyY, value )
  }

  /**
   * @public
   * @param { T } keyX
   * @param { U } keyY
   * @returns { V | undefined }
   */
  get( keyX, keyY ) {
    const indexY = this.index.get( keyX )
    if( indexY === undefined ) { return indexY }
    return indexY.get( keyY )
  }

}
