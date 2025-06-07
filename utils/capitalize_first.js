/**
 * @param { string } text
 * @returns { string }
 */
export function capitalizeFirst( text ) {
  const firstChar = text.charAt( 0 )
  const capitalizedFirstChar = firstChar.toUpperCase()
  const textWithoutFirst = text.slice( 1 )
  return capitalizedFirstChar + textWithoutFirst
}
