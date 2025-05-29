export interface Storage {
  set( value:string ): Promise<void>
  get(): Promise<string|null>
}
