import BackButton from '@/components/BackButton'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } HeaderProps
 * @property { string } children
 */

/**
 * @param { HeaderProps } props
 * @returns { ReactElement }
 */
const Header = ( props ) => {
  const { children } = props
  const { colors } = useTheme()
  return (
    <View style={ styles.header }>
      <BackButton />
      <Text adjustsFontSizeToFit style={ [ styles.title, { color:colors.text } ] }>{ children }</Text>
      <View style={ styles.placeholder } />
    </View>
  )
}

const styles = StyleSheet.create( {

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },

  placeholder: {
    width: 40,
  },

} )

export default Header
