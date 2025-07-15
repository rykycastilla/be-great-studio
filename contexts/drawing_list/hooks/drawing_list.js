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
 * @property { ( drawing:Drawing ) => Promise<void> } duplicateDrawing
 * @property { ( drawing:Drawing|Drawing[] ) => Promise<void> } shareDrawing
 * @property { ( bgpxData:string ) => Promise<void> } importDrawing
 * @property { ( drawing:Drawing ) => Promise<void> } removeDrawing
 */

/**
 * @returns { DrawingListResult }
 */
export function useDrawingList() {
  const { drawingList, saveDrawing, updateDrawing, duplicateDrawing, shareDrawing, removeDrawing, importDrawing } = useContext( DrawingListContext )
  return { drawingList, saveDrawing, updateDrawing, duplicateDrawing, shareDrawing, importDrawing, removeDrawing }
}
