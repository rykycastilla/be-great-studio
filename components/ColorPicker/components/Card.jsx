import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 * @import { SharedValue } from 'react-native-reanimated'
 */

const AnimatedView = Reanimated.createAnimatedComponent( View )

/**
 * @typedef { object } CardProps
 * @property { ReactElement[] | ReactElement } children
 * @property { number } width
 * @property { string } title
 * @property { SharedValue<number> } scale
 */

/**
 * @param { CardProps } props
 * @returns { ReactElement }
 */
const Card = ( props ) => {

  const { children, width, title, scale } = props
  const { colors } = useTheme()

  const cardStyle = useAnimatedStyle( () => {
    return {
      transform: [{ scale: scale.value }],
    }
  } )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <AnimatedView
        style={[
          styles.card,
          cardStyle,
          {
            backgroundColor: colors.card,
            width,
            borderColor: colors.border,
          },
        ]}
      >
        <Text adjustsFontSizeToFit style={[styles.title, { color: colors.text }]}>{ title }</Text>
        { children }
      </AnimatedView>
    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create( {

  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },

  card: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },

} )

export default Card
