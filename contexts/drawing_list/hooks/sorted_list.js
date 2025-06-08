import { SortCategory } from '../models'
import { useDrawingList } from './drawing_list'
import { useMemo } from 'react'
import { useSort } from './sort'

/**
 * @import { Drawing } from '../models'
 */

/**
 * @param { Drawing[] } list
 * @param { boolean } ascending
 */
function sortByName( list, ascending ) {
  list.sort( ( a, b ) => {
    let orderResult = 0
    if( a.name < b.name ) { orderResult = -1 }
    else if( a.name > b.name ) { orderResult = 1 }
    if( !ascending ) { orderResult *= -1 }
    return orderResult
  } )
}

/**
 * @param { Drawing[] } list
 * @param { boolean } ascending
 */
function sortByDate( list, ascending ) {
  list.sort( ( a, b ) => {
    let orderResult = 0
    if( a.lastModified < b.lastModified ) { orderResult = -1 }
    else if( a.lastModified > b.lastModified ) { orderResult = 1 }
    if( !ascending ) { orderResult *= -1 }
    return orderResult
  } )
}

/**
 * @returns { Drawing[] }
 */
export function useSortedList() {
  const { drawingList } = useDrawingList()
  const [ sort ] = useSort()
  return useMemo( () => {
    const { category, ascending } = sort
    const sortedList = [ ...drawingList ]
    /** @type { ( list:Drawing[], ascending:boolean ) => void } */ const sortList = ( category === SortCategory.ALPHABETICAL ) ? sortByName : sortByDate
    sortList( sortedList, ascending )
    return sortedList
  }, [ drawingList, sort ] )
}
