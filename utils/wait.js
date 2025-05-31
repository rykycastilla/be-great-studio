/**
 * @param { number } time
 * @returns { Promise<void> }
*/
export function wait( time ) {
  return new Promise( ( resolve ) => {
    setTimeout( resolve, time )
  } )
}
