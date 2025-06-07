import { createToken } from 'create-token'

/**
 * @returns { string }
 */
export function genId() {
  return createToken( 15 )
}
