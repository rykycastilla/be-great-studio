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
  const { resolution } = useSettings()
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
