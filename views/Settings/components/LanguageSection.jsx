import NavigationItem from './NavigationItem'
import SectionHeader from './SectionHeader'
import SwitchItem from './SwitchItem'
import { useCallback } from 'react'
import { useLanguage } from '@/contexts/language'
import { useSettings } from '@/contexts/settings'

/**
 * @import { ReactElement } from 'react'
 */

const languageIndex = {
  en: 'english',
  es: 'spanish',
}

/**
 * @returns { ReactElement }
 */
const LanguageSection = () => {

  const { currentLanguage, language, setLanguage } = useSettings()
  const languageName = languageIndex[ /** @type { keyof languageIndex } */ ( currentLanguage ) ]
  const usingSysLang = language === 'system'
  const { t } = useLanguage()

  const updateSysLangUsage = useCallback(
    /** @type { ( shouldSetSysLang:boolean ) => void } */
    ( shouldSetSysLang ) => {
      if( shouldSetSysLang ) { setLanguage( 'system' ) }
      else { setLanguage( currentLanguage ) }
    }, [ currentLanguage, setLanguage ] )

  return (
    <>
      <SectionHeader>Language</SectionHeader>
      <SwitchItem label={ t( 'use-system-language' ) }
        isActive={ usingSysLang }
        onIsActiveChange={ updateSysLangUsage } />
      <NavigationItem
        target="language"
        label={ t( 'language' ) }
        value={ t( languageName ) }
        disabled={ usingSysLang } />
    </>
  )

}

export default LanguageSection
