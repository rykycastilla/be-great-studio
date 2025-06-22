import Touch from './Touch'

/**
 * @import { ReactElement } from 'react'
 * @import { Touch as ITouch } from '../types/Touch'
 */

/**
 * @typedef { object } TouchListProps
 * @property { ITouch[] } data
 * @property { number } touchSize
 */

/**
 * @param { TouchListProps } props
 * @returns { ReactElement[] }
 */
const TouchList = ( props ) => {
  const { data, touchSize } = props
  return data.map( ( { id, x, y } ) => (
    <Touch key={ id } size={ touchSize } x={ x } y={ y } />
  ) )
}

export default TouchList
