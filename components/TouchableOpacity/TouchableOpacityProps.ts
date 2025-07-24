import { PressableProps } from 'react-native-gesture-handler'
import { TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native'

export interface TouchableOpacityProps extends Omit<RNTouchableOpacityProps, 'onPress' | 'onLongPress'> {
  onPress?: PressableProps[ 'onPress' ]
  onLongPress?: PressableProps[ 'onLongPress' ]
}
