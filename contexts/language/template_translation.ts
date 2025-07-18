import { Lang } from './Lang'
import { useCallback } from 'react'

/**
 * Replaces $( number ) by the specific value provided by 'args' array
 */
function renderTemplate( template:string, args:unknown[] ): string {
  let result: string = template
  for( let i = 0; i < args.length; i++ ) {
    const arg: unknown = args[ i ]
    const key = `$${ i + 1 }`
    result = result.replaceAll( key, String( arg ) )
  }
  return result
}

export interface Translation {
  ( target:string, ...args:unknown[] ): string
}

/**
 * Builds a function to access to the specified translation template (target) in the language database.
 * The returned function also replaces $( number ) values in the templates using the values provided as args
 */
export function useTemplateTranslation( lang:Lang ): Translation {
  return useCallback( ( target:string, ...args:unknown[] ) => {
    if( target === 'CODE' ) { return '' }
    // Extracting the current translation template
    const translatedTemplate: string | undefined = lang[ target ]
    if( translatedTemplate === undefined ) { return '' }
    // Replacing $number in the template
    return renderTemplate( translatedTemplate, args )
  }, [ lang ] )
}
