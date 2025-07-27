import { SafeView } from '@/contexts/window'
import Header from './Header'
import icon from '@/assets/images/icon.png'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useFocus } from '@/contexts/debounced_router'
import { useLanguage } from '@/contexts/language'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const LicenseView = () => {
  const { colors } = useTheme()
  const { t } = useLanguage()

  useFocus()

  return (
    <SafeView>
      <Header>{ t( 'license' ) }</Header>
      <View style={ styles.content }>
        <Image source={ icon } style={ styles.brandIcon } />
        <Text adjustsFontSizeToFit style={ styles.licenseContainer }>
          <Text adjustsFontSizeToFit style={ [ styles.licenseText, { color:colors.text } ] }>
            Copyright © { new Date().getFullYear() } BeGreat Studio™
          </Text>
          { '\n' }
          <Text adjustsFontSizeToFit style={ [ styles.licenseDescription, { color:colors.inactive } ] }>
            This App is subject to the terms of the Mozilla Public License, v. 2.0.
            This name, logo and branding elements are protected by trademarks law.
          </Text>
        </Text>
        <Text adjustsFontSizeToFit style={ [ styles.poweredBy, { color:colors.inactive } ] }>
          Powered by RN Drawing™
        </Text>
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

  brandIcon: {
    width: 128,
    height: 128,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 25,
  },

  licenseContainer: {
    marginBottom: 'auto',
  },

  licenseText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },

  licenseDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  poweredBy: {
    marginTop: 'auto',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

} )

export default LicenseView
