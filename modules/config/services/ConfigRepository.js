/**
 * @import { ConfigDAO } from './ConfigDAO'
 */

export class ConfigRepository {

  /** @private @readonly */ configDAO

  /**
   * @param { ConfigDAO } configDAO
   */
  constructor( configDAO ) {
    this.configDAO = configDAO
  }

  /**
   * @public
   * @param { string } fromId
   * @param { string } toId
   */
  async transfer( fromId, toId ) {
    const config = await this.configDAO.get( fromId )
    if( config === null ) { return }
    config.id = toId
    await this.configDAO.save( config )
  }

  /**
   * @public
   * @param { string[] } activeIdList
   */
  async collectGarbage( activeIdList ) {
    const activeList = new Set( activeIdList )
    const configList = await this.configDAO.getAll()
    for( const { id } of configList ) {
      const isInactive = !activeList.has( id )
      if( isInactive ) { await this.configDAO.delete( id ) }
    }
  }

}
