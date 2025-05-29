import { JSONCodec, AsyncStorage } from './controllers'
import { StorageManager } from './services'
import { useMemo } from 'react'

export function useStorageManager<T>( key:string ): StorageManager<T> {
  return useMemo( () => {
    const codec = new JSONCodec<T>()
    const storage = new AsyncStorage( key )
    return new StorageManager<T>( codec, storage )
  }, [ key ] )
}
