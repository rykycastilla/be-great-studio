import { getSystemLanguage } from './get_system_language'
import { LanguageContext } from './context'
import { LanguageIndex } from './LanguageIndex'
import { ReactElement, useMemo } from 'react'
import { UnexpectedDefaultLanguageError } from './UnexpectedDefaultLanguageError'
import { useLangsBuilder } from './langs_builder'
import { useStorageState } from '@/hooks/storage_state'
import { useTemplateTranslation } from './template_translation'

interface LanguageProviderProps {
  children: ReactElement
  langs: LanguageIndex
  defaultLang: string
}

/**
 * @param props.languages  Available lang codes divided by ","
 */
const LanguageProvider = ( props:LanguageProviderProps ): ReactElement => {

  const { children, langs, defaultLang:defaultLangCode } = props
  const [ languageConfig, setLanguageConfig ] = useStorageState( 'system', 'language' )
  const codeList = Object.keys( langs )

  // Getting language code based on provided config
  const code = useMemo<string>( () => {
    let code: string = ( languageConfig === 'system' ) ? getSystemLanguage() : languageConfig
    // Ensuring default language is a valid language
    const defaultWasIncluded: boolean = codeList.indexOf( defaultLangCode ) >= 0
    if( !defaultWasIncluded ) {
      throw new UnexpectedDefaultLanguageError( defaultLangCode )
    }
    // Ensuring selected language is a valid language
    const codeIsInList: boolean = codeList.indexOf( code ) >= 0
    if( !codeIsInList ) {
      console.warn( `Bad language config. Using default (${ defaultLangCode }) instead` )
      code = defaultLangCode
    }
    return code
  }, [ languageConfig, codeList, defaultLangCode ] )

  const lang = useLangsBuilder( langs, code )
  const t = useTemplateTranslation( lang )

  return (
    <LanguageContext.Provider value={
      { t, language:code, languageConfig, setLanguage:setLanguageConfig }
    }>
      { children }
    </LanguageContext.Provider>
  )

}

export default LanguageProvider
