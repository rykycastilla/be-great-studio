import { ConfigKey } from '../models/ConfigKey'

/**
 * @abstract
*/
export class ConfigKeyService {

  /**
   * @public
   * @param { string } key
   * @returns { KeyData | null }
   */
  static extractFromKey( key ) {
    const configKeyPattern = /^drawing-config-(.+)-(.+)$/
    const match = /** @type { [ string, string, string ] | null } */ ( key.match( configKeyPattern ) )
    if( match === null ) { return null }
    const [ , id, configName ] = match
    const configIndex = /** @type { Record<String,ConfigKey> } */ ( /** @type { unknown } */ ( ConfigKey ) )
    const config = configIndex[ configName ]
    if( config === undefined ) { return null }
    return { id, config }
  }

  /**
   * @public
   * @param { string } id
   * @param { ConfigKey } config
   * @returns { string }
   */
  static getConfigKeyFor( id, config ) {
    return `drawing-config-${ id }-${ ConfigKey[ config ] }`
  }

}

/**
 * @typedef { object } KeyData
 * @property { string } id
 * @property { ConfigKey } config
 */
