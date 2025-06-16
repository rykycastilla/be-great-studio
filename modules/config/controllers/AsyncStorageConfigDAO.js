import AsyncStorage from '@react-native-async-storage/async-storage'
import { ConfigKey } from '@/modules/config/models'
import { ConfigKeyService } from '@/modules/config/services'

/**
 * @import { ConfigDAO, ConfigDTO } from '@/modules/config/services'
*/

/**
 * @implements { ConfigDAO }
 */
export class AsyncStorageConfigDAO {

  /**
   * @private
   * @param { string } id
   * @param { ConfigKey } config
   * @returns { Promise<string|null> }
   */
  getConfigItem( id, config ) {
    const key = ConfigKeyService.getConfigKeyFor( id, config )
    return AsyncStorage.getItem( key )
  }

  /**
   * @public
   * @param { string } id
   * @returns { Promise<ConfigDTO|null> }
   */
  async get( id ) {
    const tool = await this.getConfigItem( id, ConfigKey.TOOL )
    const size = await this.getConfigItem( id, ConfigKey.SIZE )
    const color = await this.getConfigItem( id, ConfigKey.COLOR )
    const color_list = await this.getConfigItem( id, ConfigKey.COLOR_LIST )
    if( ( tool === null ) && ( size === null ) && ( color === null ) && ( color_list === null ) ) {
      return null
    }
    return { id, tool, size, color, color_list }
  }

  /**
   * @private
   * @param { string } id
   * @param { ConfigKey } config
   * @param { string | null } value
   */
  async saveConfigItem( id, config, value ) {
    const key = ConfigKeyService.getConfigKeyFor( id, config )
    if( value !== null ) { await AsyncStorage.setItem( key, value ) }
  }

  /**
   * @public
   * @param { ConfigDTO } config
   */
  async save( config ) {
    const { id, tool, size, color, color_list } = config
    await this.saveConfigItem( id, ConfigKey.TOOL, tool )
    await this.saveConfigItem( id, ConfigKey.SIZE, size )
    await this.saveConfigItem( id, ConfigKey.COLOR, color )
    await this.saveConfigItem( id, ConfigKey.COLOR_LIST, color_list )
  }

  /**
   * @private
   * @param { string } id
   * @param { ConfigKey } config
   */
  async deleteConfigItem( id, config ) {
    const key = ConfigKeyService.getConfigKeyFor( id, config )
    await AsyncStorage.removeItem( key )
  }

  /**
   * @public
   * @param { string } id
   */
  async delete( id ) {
    await this.deleteConfigItem( id, ConfigKey.TOOL )
    await this.deleteConfigItem( id, ConfigKey.SIZE )
    await this.deleteConfigItem( id, ConfigKey.COLOR )
    await this.deleteConfigItem( id, ConfigKey.COLOR_LIST )
  }

  /**
   * @public
   * @returns { Promise<ConfigDTO[]> }
   */
  async getAll() {
    const keyList = await AsyncStorage.getAllKeys()
    /** @type { Record<string,ConfigDTO> } */ const configIndex = {}
    for( const key of keyList ) {
      const keyData = ConfigKeyService.extractFromKey( key )
      if( keyData === null ) { continue }
      const { id } = keyData
      if( configIndex[ id ] === undefined ) {
        const config = await this.get( id )
        if( config !== null ) { configIndex[ id ] = config }
      }
    }
    return Object.values( configIndex )
  }

}
