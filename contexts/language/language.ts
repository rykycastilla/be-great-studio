import { LanguageContext } from './context'
import { useContext } from 'react'

export function useLanguage(): LanguageContext {
  return useContext( LanguageContext )
}
