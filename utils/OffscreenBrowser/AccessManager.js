import { loadTextAsset } from '@/utils/load_text_asset'
import { MessageSystem } from './MessageSystem'

/**
 * @abstract
 */
export class AccessManager {

  static topKey = 0
  /** @private @readonly @type { MessageSystem[] } */ static accessList = []
  /** @private @type { ( ( accessList:MessageSystem[] ) => void ) | null } */ static onaccesslistchange = null

  /**
   * @private
   */
  static dispatchAccessListChangeEvent() {
    if( AccessManager.onaccesslistchange === null ) { return }
    AccessManager.onaccesslistchange( AccessManager.accessList )
  }

  /**
   * @public
   * @param { ( ( accessList:MessageSystem[] ) => void ) | null } handler
   */
  static onAccessListChange( handler ) {
    this.onaccesslistchange = handler
    this.dispatchAccessListChangeEvent()
  }

  /**
   * @param { number[] } assetList
   * @returns { Promise<string[]> }
   */
  static async prepareScriptAssets( assetList ) {
    /** @type { string[] } */ const scriptList = []
    for( const asset of assetList ) {
      const script = await loadTextAsset( asset )
      scriptList.push( script )
    }
    return scriptList
  }

  /**
   * @public
   * @param { number[] } assetList
   * @returns { Promise<MessageSystem> }
   */
  static async create( assetList ) {
    const setupScripts = await AccessManager.prepareScriptAssets( assetList )
    const access = new MessageSystem( this.topKey++, setupScripts )
    AccessManager.accessList.push( access )
    AccessManager.dispatchAccessListChangeEvent()
    return access
  }

}
