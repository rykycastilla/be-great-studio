import { SafeView } from '@/contexts/window'
import Header from './components/Header'
import LanguageSection from './components/LanguageSection'
import NavigationItem from './components/NavigationItem'
import SectionHeader from './components/SectionHeader'
import SwitchItem from './components/SwitchItem'
import { Format } from '@/modules/image_converter/models'
import { REAL_EXPORT_RESOLUTION_REF } from '@/constants'
import { ScrollView, StyleSheet } from 'react-native'
import { useLanguage } from '@/contexts/language'
import { useSettings } from '@/contexts/settings'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @param { number } resolution
 * @param { boolean } disabled
 */
function getResolutionValue( resolution, disabled ) {
  if( ( resolution === REAL_EXPORT_RESOLUTION_REF ) || disabled ) { return 'Real' }
  return `${ resolution }px`
}

/**
 * @returns { ReactElement }
 */
const Settings = () => {
  const { resolution, aspectRatio, showTouchCursor, setShowTouchCursor, exportResolution, exportFormat } = useSettings()
  const resolutionDisabled = exportFormat === Format.BGPX
  const { t } = useLanguage()
  return (
    <SafeView style={ styles.container }>
      <Header>{ t( 'settings' ) }</Header>
      <ScrollView
        style={ styles.content }
        contentContainerStyle={ styles.contentContainer }
        showsVerticalScrollIndicator={ false }
        bounces={ true }>
        <SectionHeader>{ t( 'viewing' ) }</SectionHeader>
        <NavigationItem target="resolution" label={ t( 'resolution' ) } value={ `${ resolution }px` } />
        <NavigationItem target="aspect-ratio" label={ t( 'aspect-ratio' ) } value={ aspectRatio } />
        <SectionHeader>{ t( 'drawing-area' ) }</SectionHeader>
        <SwitchItem
          label={ t( 'touch-cursor' ) }
          isActive={ showTouchCursor }
          onIsActiveChange={ setShowTouchCursor } />
        <SectionHeader>{ t( 'exporting' ) }</SectionHeader>
        <NavigationItem
          target="export-resolution"
          label={ t( 'resolution' ) }
          value={ getResolutionValue( exportResolution, resolutionDisabled ) }
          disabled={ resolutionDisabled } />
        <NavigationItem target="export-format" label={ t( 'format' ) } value={ Format[ exportFormat ] } />
        <LanguageSection />
        <SectionHeader>Legal</SectionHeader>
        <NavigationItem target="license" label={ t( 'license' ) } />
        <NavigationItem target="op-licenses" label={ t( 'open-source-licenses' ) } />
        <NavigationItem target="contributors" label={ t( 'contributors' ) } />
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

export default Settings
