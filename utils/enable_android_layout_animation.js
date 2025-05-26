import { Platform, UIManager } from 'react-native'

export function enableAndroidLayoutAnimation() {
  if( Platform.OS === 'android' ) {
    if( UIManager.setLayoutAnimationEnabledExperimental ) {
      UIManager.setLayoutAnimationEnabledExperimental( true )
    }
  }
}
