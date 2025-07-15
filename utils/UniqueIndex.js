/**
 * @template T
 */
export class UniqueIndex {

  /** @private @readonly @type { Record<string,Target<T>> } */ index = {}
  /** @private @readonly */ repetitionIndex = new NumericalIndex()

  /**
   * Stores a value associated with a unique key and a variable key.
   * @public
   * @param { string } uniqueKey
   * @param { string } varKey
   * @param { T } value
   */
  set( uniqueKey, varKey, value ) {
    const target = { varKey, value }
    this.index[ uniqueKey ] = target
    // Adding new occurrence
    const keysAmount = this.repetitionIndex.get( varKey )
    this.repetitionIndex.set( varKey, keysAmount + 1 )
  }

  /**
   * Iterates over all stored entries, computing a final key for each.
   * If the associated varKey has more than one occurrence, the final key
   * includes the uniqueKey as a suffix.
   * @param { ( key:string, value:T ) => void } callback
   */
  forEach( callback ) {
    const uniqueKeyList = Object.keys( this.index )
    for( const uniqueKey of uniqueKeyList ) {
      const { varKey, value } = /** @type { Target<T> } */ ( this.index[ uniqueKey ] )
      // Suffixing
      const keysAmount = this.repetitionIndex.get( varKey )
      const key = ( keysAmount > 1 ) ? `${ varKey }-${ uniqueKey }` : varKey
      callback( key, value )
    }
  }

}

/**
 * @template T
 * @typedef { object } Target
 * @property { string } varKey
 * @property { T } value
 */

class NumericalIndex {

  /** @private @readonly @type { Record<string,number> } */ index = {}

  /**
   * @param { string } key
   * @returns { number }
   */
  get( key ) {
    const num = this.index[ key ]
    if( num === undefined ) { return 0 }
    return num
  }

  /**
   * @param { string } key
   * @param { number } num
   */
  set( key, num ) {
    this.index[ key ] = num
  }

}
