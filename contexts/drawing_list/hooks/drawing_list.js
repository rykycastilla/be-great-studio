import { DrawingListContext } from '../context'
import { useContext } from 'react'

/**
 * @import { Drawing } from '../models'
 */

/**
 * @typedef { object } DrawingListResult
 * @property { Drawing[] } drawingList
 * @property { ( drawing:Drawing, data:string ) => Promise<void> } saveDrawing
 * @property { ( drawing:Drawing, newProperties:Partial<Drawing> ) => Promise<void> } updateDrawing
 */

/**
 * @returns { DrawingListResult }
 */
export function useDrawingList() {
  const { drawingList, saveDrawing, updateDrawing } = useContext( DrawingListContext )
  return { drawingList, saveDrawing, updateDrawing }
}
