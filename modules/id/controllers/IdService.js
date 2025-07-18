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
    return uuid.v4()
  }

}
