import NativeBridge from '@/assets/browser/NativeBridge.es6'
import { AccessManager } from './AccessManager'
import { Resolver } from '@/utils/Resolver'

/**
 * @import { DataPack } from './DataPack'
 */

export class OffscreenBrowser {

  /** @private */ topKey = 0
  /** @private @readonly @type { Record<number,Resolver<DataPack>> } */ responseIndex = {}
  /** @private @readonly */ access

  /**
   * @param { number[] } assetList
   */
  constructor( ...assetList ) {
    this.access = AccessManager.create( [ NativeBridge, ...assetList ] )
    this.access.then( ( access ) => {
      access.onmessage = ( message ) => this.receive( message )
    } )
  }

  /**
   * @public
   * @param { string } target
   * @param { any } data
   * @returns { Promise<any> }
   */
  async call( target, data ) {
    const id = this.topKey++
    const access = await this.access
    // Sending message
    /** @type { DataPack } */ const dataPack = { id, target, data }
    const message = JSON.stringify( dataPack )
    access.sendMessage( message )
    // Preparing response
    /** @type { Resolver<DataPack> } */ const response = new Resolver()
    this.responseIndex[ id ] = response
    const { data:resData } = await response.promise
    return resData
  }

  /**
   * @private
   * @param { string } message
   */
  receive( message ) {
    /** @type { DataPack } */ const dataPack = JSON.parse( message )
    const { id } = dataPack
    const response = this.responseIndex[ id ]
    delete this.responseIndex[ id ]
    if( response === undefined ) { return }
    response.resolve( dataPack )
  }

}
