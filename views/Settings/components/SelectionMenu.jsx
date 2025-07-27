import { SafeView } from '@/contexts/window'
import Header from './Header'
import SelectionItem from './SelectionItem'
import { SettingsIndex } from '../models/SettingsIndex'
import { ScrollView, StyleSheet } from 'react-native'
import { useGlobalSearchParams } from 'expo-router'
import { useLanguage } from '@/contexts/language'
import { useSettings } from '@/contexts/settings'
import { useFocus } from '@/contexts/debounced_router'

/**
 * @import { ReactElement } from 'react'
 * @import { Setting } from '../models/Setting'
 */

/**
 * @typedef { object } ContentProps
 * @property { Setting } setting
 */

/**
 * @param { ContentProps } props
 * @returns { ReactElement[] | null }
 */
const Content = ( props ) => {

  const { setting } = props
  const settingsData = /** @type { Record<string,any> } */ ( useSettings() )

  const { getter, setter } = setting
  const selected = /** @type { any } */ ( settingsData[ getter ] )
  const setSelected = /** @type { ( selected:any ) => void } */ ( settingsData[ setter ] )
  const { t } = useLanguage()

  return setting.optionList.map( ( { value, preview, description } ) => (
    <SelectionItem
      key={ value }
      value={ value }
      preview={ t( preview ) }
      description={ t( description ) }
      selected={ selected }
      onSelectedChange={ setSelected } />
  ) )

}

/**
 * @returns { ReactElement | null }
 */
const SelectionMenu = () => {

  const { selection_menu } = /** @type { { selection_menu:string } } */ ( useGlobalSearchParams() )
  const setting = SettingsIndex[ selection_menu ]
  const { t } = useLanguage()

  useFocus()

  if( setting === undefined ) {
    return null
  }

  return (
    <SafeView style={ styles.container }>
      <Header>{ t( setting.title ) }</Header>
      <ScrollView
        style={ styles.content }
        contentContainerStyle={ styles.contentContainer }
        showsVerticalScrollIndicator={ false }
        bounces={ true }>
        <Content setting={ setting } />
      </ScrollView>
    </SafeView>
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
