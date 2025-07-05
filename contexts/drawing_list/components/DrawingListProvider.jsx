import { useDrawingController } from '../hooks/drawing_controller'
import { DrawingListContext } from '../context'
import { SortCategory } from '../models'
import { useCallback, useEffect, useState } from 'react'
import { useStorageState } from '@/hooks/storage_state'

/**
 * @import { Drawing, Sort } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } DrawingListProviderProps
 * @property { ReactElement[] | ReactElement } [ children ]
 * @property { () => void } [ onLoad ]
 */

/**
 * @param { DrawingListProviderProps } props
 * @returns { ReactElement }
 */
const DrawingListProvider = ( props ) => {

  const { children, onLoad } = props
  const [ viewMode, setViewMode, requestingViewMode ] = useStorageState( /** @type { 'grid' | 'list' } */ ( 'grid' ), 'view-mode' )
  const [ isSelectionMode, setIsSelectionMode ] = useState( false )
  const [ selectionList, setSelectionList ] = useState( /** @type { Set<string> } */ ( new Set() ) )
  const [ sort, setSort ] = useStorageState( { category:SortCategory.ALPHABETICAL, ascending:true }, 'sort' )

  const {
    drawingList, loadingList,
    saveDrawing, updateDrawing, removeDrawing,
    duplicateDrawing, shareDrawing, loadDrawingThumbnail,
  } = useDrawingController()

  // Reset selection list on mode changing
  useEffect( () => {
    setSelectionList( new Set() )
    }, [ isSelectionMode ] )  // eslint-disable-line

  // Loading Drawing list provider data
  const onLoadDrawingList = useCallback( async() => {
    await requestingViewMode
    await loadingList
    if( onLoad !== undefined ) { onLoad() }
  }, [ requestingViewMode, loadingList, onLoad ] )

  useEffect( () => {
    onLoadDrawingList()
  }, [ onLoadDrawingList ] )

  return (
    <DrawingListContext.Provider
      value={
        {
          viewMode, setViewMode,
          isSelectionMode, setIsSelectionMode,
          selectionList, setSelectionList,
          drawingList,
          saveDrawing, updateDrawing, duplicateDrawing, shareDrawing, removeDrawing,
          loadDrawingThumbnail,
          sort, setSort,
        }
      }>
      { children }
    </DrawingListContext.Provider>
  )

}

export default DrawingListProvider
