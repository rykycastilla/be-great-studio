import { useCallback } from 'react'
import { useColor } from './color'
import { useColorList } from './color_list'

/**
 * Allows to use a callback to include an select tools colors
 * @returns { ( color:string ) => void }
 */
export function useColorCreation() {
  const [ colorList, setColorList ] = useColorList()
  const [ , setColor ] = useColor()
  return useCallback(
    /** @type { ( color:string ) => void } */
    ( color ) => {
      const colorIndex = colorList.indexOf( color )
      if( colorIndex === -1 ) {  // Color doesn't exist (it will be included before)
        setColorList( [ ...colorList, color ] )
      }
      setColor( color )
    }, [ colorList, setColorList, setColor ] )
}
