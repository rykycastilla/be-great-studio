import AreaView from '@/components/AreaView'
import Header from './components/Header'
import NavigationItem from './components/NavigationItem'
import SectionHeader from './components/SectionHeader'
import { ScrollView, StyleSheet } from 'react-native'
import { useSettings } from '@/contexts/settings'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const Settings = () => {
  const { resolution, aspectRatio } = useSettings()
  return (
    <AreaView style={ styles.container }>
      <Header>Settings</Header>
      <ScrollView
        style={ styles.content }
        contentContainerStyle={ styles.contentContainer }
        showsVerticalScrollIndicator={ false }
        bounces={ true }>
        <SectionHeader>Viewing</SectionHeader>
        <NavigationItem target="resolution" label="Resolution" value={ `${ resolution }px` } />
        <NavigationItem target="aspect-ratio" label="Aspect Ratio" value={ aspectRatio } />
        <SectionHeader>Legal</SectionHeader>
        <NavigationItem target="license" label="License" />
        <NavigationItem target="op-licenses" label="Open Source Licenses" />
        <NavigationItem target="contribuitors" label="Contribuitors" />
      </ScrollView>
    </AreaView>
  )
}

const styles = StyleSheet.create( {

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },

} )

export default Settings
