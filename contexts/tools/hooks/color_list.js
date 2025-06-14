import { ToolsContext } from '../context'
import { useCallback } from 'react'
import { useColor } from './color'
import { useContext } from 'react'

/**
 * @typedef { object } ColorListResult
 * @property { string[] } colorList
 * @property { ( color:string ) => void } createColor
 * @property { ( ...colorList:string[] ) => void } deleteColor
 */

/**
 * @returns { ColorListResult }
 */
export function useColorList() {

  const { colorList, setColorList } = useContext( ToolsContext )
  const [ selectedColor, setColor ] = useColor()

  const createColor = useCallback(
    /** @type { ( color:string ) => void } */
    ( color ) => {
      const index = colorList.indexOf( color )
      if( index === -1 ) {  // Color doesn't exist (it will be included before)
        setColorList( [ ...colorList, color ] )
      }
      setColor( color )
    }, [ colorList, setColorList, setColor ] )

  const deleteColor = useCallback(
    /** @type { ( ...colorsSelected:string[] ) => void } */
    ( ...colorsToDelete ) => {
      const newColorList = new Set( colorList )
      for( const color of colorsToDelete ) {
        if( selectedColor === color ) { continue }
        newColorList.delete( color )
      }
      setColorList( [ ...newColorList ] )
    }, [ selectedColor, colorList, setColorList ] )

  return { colorList, createColor, deleteColor }

}
