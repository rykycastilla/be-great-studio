import { Lang } from './Lang'
import { LanguageIndex } from './LanguageIndex'
import { useMemo } from 'react'

export function useLangsBuilder( langs:LanguageIndex, code:string ): Lang {
  return useMemo( () => {
    const lang: Lang = {}
    const pageList = langs[ code ]!
    for( const page of pageList ) {
      Object.assign( lang, page )
    }
    return lang
  }, [ langs, code ] )
}
