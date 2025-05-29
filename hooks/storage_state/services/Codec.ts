export interface Codec<T> {
  encode( value:T ): string
  decode( data:string ): T
}
