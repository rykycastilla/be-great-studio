import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useCallback } from 'react'
import { useDrawingList, useSelectionMode } from '@/contexts/drawing_list'
import { useModalHider } from '@/contexts/modal'
import { useStaticCallback } from '@/hooks/static_callback'
import { useTheme } from '@/contexts/theme'
import { wait } from '@/utils/wait'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { OptionIcon } from '../types'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } OptionItemProps
 * @property { string } name
 * @property { OptionIcon } icon
 * @property { ( selectedDrawingList:Drawing[] ) => void } onAction
 */

/**
 * @param { OptionItemProps } props
 * @returns { ReactElement }
 */
const OptionItem = ( props ) => {

  const { name, icon, onAction } = props
  const { colors } = useTheme()
  const hideOptionsModal = useModalHider()
  const { drawingList } = useDrawingList()
  const { setIsSelectionMode, selectionList } = useSelectionMode()
  const onActionStatic = useStaticCallback( onAction )

  const selectOption = useCallback( async() => {
    /** @type { Drawing[] } */ const selectedDrawingList = []
    for( const drawing of drawingList ) {
      const isSelected = selectionList.has( drawing.id )
      if( isSelected ) { selectedDrawingList.push( drawing ) }
    }
    // Preparing to allow modal calls on `onStaticAction`
    hideOptionsModal()
    setIsSelectionMode( false )
    await wait( 1000 )
    onActionStatic( selectedDrawingList )
  }, [ drawingList, selectionList, onActionStatic, hideOptionsModal, setIsSelectionMode ] )

  return (
    <TouchableOpacity style={ styles.optionItem } onPress={ selectOption }>
      <Ionicons name={ icon } size={ 22 } color={ colors.text } />
      <Text style={ [ styles.optionText, { color:colors.text } ] }>{ name }</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },

} )

export default OptionItem
