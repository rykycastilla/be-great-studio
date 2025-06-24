import { AsyncData } from '@/utils/AsyncData'

/**
 * @import { MessageDriver } from './MessageDriver'
 * @import { MessageSender } from './MessageSender'
 */

/**
 * @implements { MessageDriver }
 */
export class MessageSystem {

  /** @private @readonly @type { AsyncData<MessageSender> } */ senderRef = new AsyncData()
  /** @type { MessageSender | null } */ onmessage = null
  /** @readonly */ key
  /** @readonly */ setupScripts

  /**
   * @param { number } key
   @param { string[] } setupScripts
   */
  constructor( key, setupScripts ) {
    this.key = key
    this.setupScripts = setupScripts
  }

  /**
   * @public
   * @param { string } data
   */
  async sendMessage( data ) {
    const sendMessage = await this.senderRef.value
    sendMessage( data )
  }

  /**
   * @param { MessageSender } sendMessage
   */
  setSender( sendMessage ) {
    this.senderRef.setValue( sendMessage )
  }

}
