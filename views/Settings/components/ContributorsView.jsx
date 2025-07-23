import { SafeView } from '@/contexts/window'
import Header from './Header'
import { StyleSheet, Text, View } from 'react-native'
import { useLanguage } from '@/contexts/language'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ContribuitorProps
 * @property { string } occupation
 * @property { string } name
 */

/**
 * @param { ContribuitorProps } props
 * @returns { ReactElement }
 */
const Contribuitor = ( props ) => {
  const { occupation, name } = props
  const { colors } = useTheme()
  return <Text style={ [ styles.licenseText, { color:colors.inactive } ] }>{ occupation }: { name }</Text>
}

/**
 * @returns { ReactElement }
 */
const ContributorsView = () => {
  const { t } = useLanguage()
  return (
    <SafeView>
      <Header>{ t( 'contributors' ) }</Header>
      <View style={ styles.content }>
        <Contribuitor occupation={ t( 'developer' ) } name="Orestes Ricardo Castilla Escalona" />
        <Contribuitor occupation={ t( 'logo-designer' ) } name="Jonathan Brito Savón" />
        <Contribuitor occupation={ t( 'name-creator' ) } name="David Silveira Bidot" />
      </View>
    </SafeView>
  )
}

const styles = StyleSheet.create( {

  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  licenseText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },

} )

export default ContributorsView
