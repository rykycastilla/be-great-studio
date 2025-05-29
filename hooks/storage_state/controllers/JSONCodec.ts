import { Codec } from '../services'

export class JSONCodec<T> implements Codec<T> {

  public encode( value:T ): string {
    return JSON.stringify( value )
  }

  public decode( data:string ): T {
    return JSON.parse( data )
  }

}
