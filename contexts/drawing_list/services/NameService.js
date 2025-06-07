export class NameService {

  /**
   * @private
   * @param { string } name
   * @returns { { namePrefix:string, index:number } }
   */
  separateIndexFromName( name ) {
    if( ( /^.* \(\d+\)$/ ).test( name ) ) {
      let indexCode = ''
      let i = name.length - 2
      while( name[ i ] !== '(' ) {
        indexCode = name[ i ] + indexCode
        i--
      }
      const index = Number( indexCode )
      const indexLength = indexCode.length + 3
      const namePrefix = name.substring( 0, name.length - indexLength )
      return { namePrefix, index }
    }
    else {
      return { namePrefix:name, index:0 }
    }
  }

  /**
   * @param { string } name
   * @param { Set<string> } nameList
   * @returns { string }
   */
  autoNum( name, nameList ) {
    const { namePrefix, index } = this.separateIndexFromName( name )
    name = `${ namePrefix } (${ index + 1 })`
    if( nameList.has( name ) ) { return this.autoNum( name, nameList ) }
    else { return name }
  }

}
