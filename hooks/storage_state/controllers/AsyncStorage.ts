import RNAsyncStorage from '@react-native-async-storage/async-storage'
import { Storage } from '../services'

export class AsyncStorage implements Storage {

  constructor(
    public readonly KEY: string,
  ) {}

  public async set( value:string ) {
    await RNAsyncStorage.setItem( this.KEY, value )
  }

  public get(): Promise<string | null> {
    return RNAsyncStorage.getItem( this.KEY )
  }

}
