import ColorOption from './ColorOption'
import EditColorsButton from './EditColorsButton'
import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useModalConfig } from '@/contexts/modal'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorModalProps
 * @property {string[] } colorList
 * @property { string } currentColor
 * @property { ( currentColor:string ) => void } setCurrentColor
 * @property { ( color:string ) => void } dispatchColorPicker
 * @property { ( ...colorList:string[] ) => void } deleteColor
 */

/**
 * @param { ColorModalProps } props
 * @returns { ReactElement }
 */
const ColorModal = ( props ) => {

  const { colorList, currentColor, setCurrentColor, dispatchColorPicker, deleteColor } = props
  const [ isDeleteMode, setIsDeleteMode ] = useState( false )
  const [ selectionList, setSelectionList ] = useState( /** @type { Set<string> } */ ( new Set() ) )
  useModalConfig( { title:'Select a color', hideButtons:true } )

  // Resetting selection
  useEffect( () => {
    setSelectionList( new Set() )
  }, [ isDeleteMode ] )

  /** @type { ( color:string ) => void } */
  const handleToggleSelection = ( color ) => {
    if( color === currentColor ) { return }  // Avoiding selection to delete current color
    if( selectionList.has( color ) ) { selectionList.delete( color ) }
    else { selectionList.add( color ) }
    setSelectionList( new Set( selectionList ) )
  }

  return (
    <View style={ styles.colorGrid }>
      {
        colorList.map( ( color ) => (
          <ColorOption
            key={ color }
            color={ color }
            currentColor={ currentColor }
            setCurrentColor={ setCurrentColor }
            isDeleteMode={ isDeleteMode }
            isSelected={ selectionList.has( color ) }
            onToggleSelection={ () => handleToggleSelection( color ) } />
        ) )
      }
      <EditColorsButton
        isDeleteMode={ isDeleteMode } onIsDeleteModeChange={ setIsDeleteMode }
        selectionList={ selectionList }
        dispatchColorPicker={ () => dispatchColorPicker( currentColor ) }
        deleteColor={ deleteColor } />
    </View>
  )

}

const styles = StyleSheet.create( {
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
} )

export default ColorModal
