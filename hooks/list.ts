import { useMemo } from 'react'

export function useList( list:string, divider:string ): string[] {
  return useMemo( () => {
    return list.split( divider )
  }, [ list, divider ] )
}
