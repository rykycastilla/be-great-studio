import { MessageSender } from './MessageSender'

export interface MessageDriver {
  key: number
  setupScripts: string[]
  onmessage: MessageSender | null
  setSender( sendMessage:MessageSender ): void
}
