export class UnexpectedDefaultLanguageError extends Error {
  constructor( code:string ) {
    super(
      `Unexpected default language code ${ code }.
      It must be a value referenced by [langs] array`,
    )
  }
}
