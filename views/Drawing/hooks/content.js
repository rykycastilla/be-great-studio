import { useDrawing } from './drawing'
import { useDrawingThumbnailLoader } from '@/components/DrawingList'
import { useCallback, useEffect, useState } from 'react'

/** Load the content saved of the current drawing
 * @returns { string | null | undefined }
 * - `null`: Not loaded yet
 * - `string`: Image content
 * - `undefined`: Not saved content
 */
export function useContent() {

  const [ content, setContent ] = useState( /** @type { string | null | undefined } */ ( null ) )
  const drawing = useDrawing()
  const loadThumbnail = useDrawingThumbnailLoader()

  const loadContent = useCallback( async() => {
    const data = await loadThumbnail( drawing )
    // Null data represents "invalid thumbnail", thats why must be used `undefined` (empty canvas)
    setContent( ( data === null ) ? undefined : data )
  }, [ loadThumbnail, drawing ] )

  useEffect( () => {
    if( content !== null ) { return }  // Ignoring contents loaded
    loadContent()
  }, [ content, loadContent ] )

  return content

}
