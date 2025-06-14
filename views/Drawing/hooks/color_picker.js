import { useCallback, useState } from 'react'

/**
 * @typedef { object } ColorPickerResult
 * @property { boolean } showColorPicker
 * @property { string } defaultColor
 * @property { ( color:string ) => void } dispatchColorPicker
 * @property { () => void } hideColorPicker
 */

/**
 * @returns { ColorPickerResult }
 */
export function useColorPicker() {

  const [ defaultColor, setDefaultColor ] = useState( '' )
  const [ showColorPicker, setShowColorPicker ] = useState( false )

  const dispatchColorPicker = useCallback(
    /** @type { ( color:string ) => void } */
    ( color ) => {
      setDefaultColor( color )
      setShowColorPicker( true )
    }, [] )

  const hideColorPicker = useCallback( () => {
    setShowColorPicker( false )
  }, [] )

  return { showColorPicker, defaultColor, dispatchColorPicker, hideColorPicker }

}
