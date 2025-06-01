import { DrawingListContext } from '../context'
import { useContext } from 'react'

export function useDrawingThumbnailLoader() {
  const { loadDrawingThumbnail } = useContext( DrawingListContext )
  return loadDrawingThumbnail
}
