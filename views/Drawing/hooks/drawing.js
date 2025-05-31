import { useDrawingList } from '@/components/DrawingList'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'

/**
 * @import { Drawing } from '@/components/DrawingList'
 */

/**
 * Gets the drawing object for the specific route
 * @returns { Drawing }
 */
export function useDrawing() {

  const { id } = /** @type { { id:string } } */ ( useLocalSearchParams() )
  const { drawingList } = useDrawingList()

  // Searching saved drawing
  const drawing = useMemo( () => {
    for( const drawing of drawingList ) {
      if( drawing.id === id ) { return drawing }
    }
  }, [ id, drawingList ] )

  // Creating drawing if it doesn't exists
  return drawing ?? { id, name:'New Drawing', thumbnail:'', lastModified:new Date() }
}
