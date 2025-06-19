import AreaView from '@/components/AreaView'
import Header from './Header'
import SelectionItem from './SelectionItem'
import { SettingsIndex } from '../models/SettingsIndex'
import { ScrollView, StyleSheet } from 'react-native'
import { useGlobalSearchParams } from 'expo-router'
import { useSettings } from '@/contexts/settings'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement[] | null }
 */
const Content = () => {

  const { selection_menu } = /** @type { { selection_menu:string } } */ ( useGlobalSearchParams() )
  const settingsData = /** @type { Record<string,any> } */ ( useSettings() )
  const setting = SettingsIndex[ selection_menu ]

  if( setting === undefined ) {
    return null
  }

  const { getter, setter } = setting
  const selected = /** @type { any } */ ( settingsData[ getter ] )
  const setSelected = /** @type { ( selected:any ) => void } */ ( settingsData[ setter ] )

  return setting.optionList.map( ( { value, preview, description } ) => (
    <SelectionItem
      key={ value }
      value={ value }
      preview={ preview }
      description={ description }
      selected={ selected }
      onSelectedChange={ setSelected } />
  ) )

}

/**
 * @returns { ReactElement }
 */
const SelectionMenu = () => {
  return (
    <AreaView style={ styles.container }>
      <Header>Resolution</Header>
      <ScrollView
        style={ styles.content }
        contentContainerStyle={ styles.contentContainer }
        showsVerticalScrollIndicator={ false }
        bounces={ true }>
        <Content />
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

export default SelectionMenu
