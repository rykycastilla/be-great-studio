import NavigationItem from './NavigationItem'
import SectionHeader from './SectionHeader'
import SwitchItem from './SwitchItem'
import { useCallback } from 'react'
import { useSettings } from '@/contexts/settings'

/**
 * @import { ReactElement } from 'react'
 */

const languageIndex = {
  en: 'English',
  es: 'Spanish',
}

/**
 * @returns { ReactElement }
 */
const LanguageSection = () => {

  const { currentLanguage, language, setLanguage } = useSettings()
  const languageName = languageIndex[ /** @type { keyof languageIndex } */ ( currentLanguage ) ]
  const usingSysLang = language === 'system'

  const updateSysLangUsage = useCallback(
    /** @type { ( shouldSetSysLang:boolean ) => void } */
    ( shouldSetSysLang ) => {
      if( shouldSetSysLang ) { setLanguage( 'system' ) }
      else { setLanguage( currentLanguage ) }
    }, [ currentLanguage, setLanguage ] )

  return (
    <>
      <SectionHeader>Language</SectionHeader>
      <SwitchItem label="Use system language"
        isActive={ usingSysLang }
        onIsActiveChange={ updateSysLangUsage } />
      <NavigationItem
        target="language"
        label="Language"
        value={ languageName }
        disabled={ usingSysLang } />
    </>
  )

}

export default LanguageSection
