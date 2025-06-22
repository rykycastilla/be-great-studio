import { GestureResponderEvent } from 'react-native'

export interface Responder {
  onTouchStart( event:GestureResponderEvent ): void
  onTouchMove( event:GestureResponderEvent ): void
  onTouchEnd( event:GestureResponderEvent ): void
  onTouchCancel( event:GestureResponderEvent ): void
}
