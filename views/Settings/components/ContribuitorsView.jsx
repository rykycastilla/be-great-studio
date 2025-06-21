import AreaView from '@/components/AreaView'
import Header from './Header'
import { StyleSheet, Text, View } from 'react-native'
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
const ContribuitorsView = () => {
  return (
    <AreaView>
      <Header>Contribuitors</Header>
      <View style={ styles.content }>
        <Contribuitor occupation="Developer" name="Orestes Ricardo Castilla Escalona" />
        <Contribuitor occupation="Foundational Logo Designer" name="Jonathan Brito Savón" />
        <Contribuitor occupation="Name Creator" name="David Silveira Bidot" />
      </View>
    </AreaView>
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

export default ContribuitorsView
