import AreaView from '@/components/AreaView'
import Header from './Header'
import { StyleSheet, Text, View } from 'react-native'
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
 * @param { LibProps } props
 * @returns { ReactElement }
 */
const Lib = ( props ) => {
  const { name, license } = props
  const { colors } = useTheme()
  return (
    <Text style={ styles.licenseText }>
      <Text style={ { color:colors.text } }>{ name }</Text>
      <Text style={ { color:colors.inactive } }> - { license }</Text>
    </Text>
  )
}

/**
 * @returns { ReactElement }
 */
const OpenSourceLicensesView = () => {
  return (
    <AreaView>
      <Header>Open Source Licenses</Header>
      <View style={ styles.content }>
        <Lib name="Expo" license="MIT" />
        <Lib name="JSZip" license="MIT" />
        <Lib name="PNG Metadata" license="MIT" />
        <Lib name="React" license="MIT" />
        <Lib name="React Native" license="MIT" />
        <Lib name="React Native Skia" license="MIT" />
        <Lib name="RN Drawing" license="MIT" />
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

export default OpenSourceLicensesView
