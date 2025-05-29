import { DrawingListContext } from '../context'
import { useContext } from 'react'

/**
 * @import { Drawing } from '../models'
 */

/**
 * @typedef { Object } DrawingListResult
 * @property { Drawing[] } drawingList
 * @property { ( drawing:Drawing, data:string ) => Promise<void> } saveDrawing
 */

/**
 * @returns { DrawingListResult }
 */
export function useDrawingList() {
  const { drawingList, saveDrawing } = useContext( DrawingListContext )
  return { drawingList, saveDrawing }
}
