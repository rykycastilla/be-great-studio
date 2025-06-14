import { useEffect, useRef } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

/**
 * @param { string | null } color
 * @param { ( color:string ) => void } handleColorChange
 */
export function useColorEvent( color, handleColorChange ) {

  const handleColorChangeStatic = useStaticCallback( handleColorChange )
  const colorRef = useRef( /** @type { string | null } */ ( null ) )

  // Updating color to send by event emitter
  useEffect( () => {
    colorRef.current = color
  }, [ color, colorRef ] )

  // Event Emitter: Makes a debounce effect only emitting the latest color (with an interval)
  useEffect( () => {
    const interval = setInterval( () => {
      const color = colorRef.current
      if( color === null ) { return }
      colorRef.current = null
      handleColorChangeStatic( color )
    }, 50 )
    return () => clearInterval( interval )
  }, [ handleColorChangeStatic, colorRef ] )

}
