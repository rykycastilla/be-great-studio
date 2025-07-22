import { createContext } from 'react'

export interface LanguageContext {

  language: string
  setLanguage( language:string ): void

  /** Latest real value provided by `setLanguage` */
  languageConfig: string

  /**
   * A function to access to the specified translation
   * @param target  Name of the translation template in the database
   * @param args  These values can be provided to replace $number patterns in the translation template
   */
  t( target:string, ...args:unknown[] ): string

}

export const LanguageContext = createContext( null as unknown as LanguageContext )
