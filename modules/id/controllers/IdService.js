import uuid from 'react-native-uuid'

/**
 * @abstract
 */
export class IdService {

  /**
   * @public
   * @returns { string }
   */
  static create() {
    const result = uuid.v4()
    console.log( result )
    return result
  }

}
