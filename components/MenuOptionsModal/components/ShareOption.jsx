import OptionItem from './OptionItem'
import { useCallback } from 'react'
import { useDrawingList } from '@/contexts/drawing_list'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ShareOptionProps
 * @property { boolean } hidden
 */

/**
 * @param { ShareOptionProps } props
 * @returns { ReactElement }
 */
const ShareOption = ( props ) => {

  const { hidden } = props
  const { shareDrawing } = useDrawingList()

  const onAction = useCallback(
    /** @type { ( drawingList:Drawing[] ) => void } */
    ( drawingList ) => {
      const [ drawing ] = /** @type { [ Drawing ] } */ ( drawingList )
      shareDrawing( drawing )
    }, [ shareDrawing ] )

  return (
    <OptionItem
      name="Share"
      icon="share-outline"
      onAction={ onAction }
      hidden={ hidden } />
  )

}

export default ShareOption
