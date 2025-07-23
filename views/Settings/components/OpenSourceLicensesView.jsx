import { SafeView } from '@/contexts/window'
import Header from './Header'
import { Fragment } from 'react'
import { LicenseList } from '../models/LicenseList'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLanguage } from '@/contexts/language'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } LibProps
 * @property { string } name
 * @property { string } license
 */

/**
 * @returns { ReactElement }
 */
const Separator = () => {
  const { colors } = useTheme()
  return <View style={ [ styles.separator, { borderColor:colors.inactive } ] } />
}

/**
 * @typedef { object } LicenseProps
 * @property { string } lib
 * @property { string } name
 * @property { string } description
 */

/**
 * @param { LicenseProps } props
 * @returns { ReactElement }
 */
const License = ( props ) => {
  const { lib, name, description } = props
  const { colors } = useTheme()
  return (
    <View style={ styles.licenseContainer }>
      <Text style={ [ styles.libName, { color:colors.text } ] }>{ lib }</Text>
      <Text style={ [ styles.licenseName, { color:colors.text } ] }>{ name }</Text>
      <Text style={ [ styles.licenseText, { color:colors.inactive } ] }>{ description }</Text>
    </View>
  )
}

/**
 * @returns { ReactElement }
 */
const OpenSourceLicensesView = () => {
  const { t } = useLanguage()
  return (
    <SafeView>
      <Header>{ t( 'open-source-licenses' ) }</Header>
      <ScrollView>
        { LicenseList.map( ( license, index ) => {
          const { lib, name, description } = license
          return (
            <Fragment key={ lib }>
              <License
                lib={ lib }
                name={ name }
                description={ description } />
              { ( index < ( LicenseList.length - 1 ) ) && <Separator /> }
            </Fragment>
          )
        } ) }
      </ScrollView>
    </SafeView>
  )
}

const styles = StyleSheet.create( {

  licenseContainer: {
    marginTop: 32,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 16,
  },

  libName: {
    fontSize: 20,
  },

  licenseName: {
    marginTop: 18,
    fontSize: 16,
  },

  licenseText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'justify',
  },

  separator: {
    width: '100%',
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
  },

} )

export default OpenSourceLicensesView
