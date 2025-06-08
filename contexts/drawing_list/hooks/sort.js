import { DrawingListContext } from '../context'
import { useContext } from 'react'

/**
 * @import { Sort } from '../models'
 */

/**
 * @returns { [ Sort, ( order:Sort ) => void ] }
 */
export function useSort() {
  const { sort, setSort } = useContext( DrawingListContext )
  return [ sort, setSort ]
}
