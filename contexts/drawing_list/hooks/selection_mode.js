import { DrawingListContext } from '../context'
import { useCallback, useEffect } from 'react'
import { useContext } from 'react'

/**
 * @typedef { object } SelectionModeResult
 * @property { boolean } isSelectionMode
 * @property { Set<string> } selectionList
 * @property { ( isSelectionMode:boolean ) => void } setIsSelectionMode
 * @property { ( id:string ) => void } addItem
 * @property { ( id:string ) => void } deleteItem
 * @property { ( id:string ) => boolean } checkItemIncluded
 */

/**
 * @returns { SelectionModeResult }
 */
export function useSelectionMode() {

  const {
    isSelectionMode, setIsSelectionMode, selectionList, setSelectionList,
  } = useContext( DrawingListContext )

  // Reset selection list on mode changing
  useEffect( () => {
    setSelectionList( new Set() )
  }, [ isSelectionMode ] )  // eslint-disable-line

  const addItem = useCallback(
    /** @type { ( id:string ) => void } */
    ( id ) => {
      if( !isSelectionMode ) { return }
      selectionList.add( id )
      setSelectionList( new Set( selectionList ) )
    }, [ isSelectionMode, selectionList, setSelectionList ] )

  const checkItemIncluded = useCallback(
    /** @type { ( id:string ) => boolean } */
    ( id ) => {
      if( !isSelectionMode ) { return false }
      return selectionList.has( id )
    }, [ isSelectionMode, selectionList ] )

  const deleteItem = useCallback(
    /** @type { ( id:string ) => void } */
    ( id ) => {
      if( !isSelectionMode ) { return }
      selectionList.delete( id )
      setSelectionList( new Set( selectionList ) )
    }, [ isSelectionMode, selectionList, setSelectionList ] )

  return { isSelectionMode, selectionList, setIsSelectionMode, addItem, checkItemIncluded, deleteItem }

}
