import Animated from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { useAnimatedStyle } from 'react-native-reanimated'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

/**
 * @typedef { object } CardProps
 * @property { ReactElement[] | ReactElement } children
 * @property { SharedValue<number> } translateY
 */

/**
 * @param { CardProps } props
 * @returns { ReactElement }
 */
const Card = ( props ) => {

  const { children, translateY } = props
  const { colors } = useTheme()

  const animatedModalStyle = useAnimatedStyle( () => {
    return {
      transform: [ { translateY:translateY.value } ],
    }
  } )

  return (
    <Animated.View style={ [ styles.card, animatedModalStyle ] }>
      <View style={ [ styles.content, { backgroundColor:colors.card } ] }>
        { children }
      </View>
    </Animated.View>
  )

}

const styles = StyleSheet.create( {

  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },

  content: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },

} )

export default Card
