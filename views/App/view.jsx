import AddPictureButton from './components/AddPictureButton'
import AreaView from '@/components/AreaView'
import ItemPreview from './components/ItemPreview'
import SelectionButton from './components/SelectionButton'
import SelectionCounter from './components/SelectionCounter'
import SelectionMenuButton from './components/SelectionMenuButton'
import SortButton from './components/SortButton'
import ViewModeButton from './components/ViewModeButton'
import { DrawingList, useSelectionMode } from '@/contexts/drawing_list'
import { View, StyleSheet } from 'react-native'
import { useBack } from '@/hooks/back'

/**
 * @import { ReactElement } from 'react'
 */

import { usePreview } from './hooks/preview'

/**
 * @returns { ReactElement }
 */
const App = () => {
  const { isSelectionMode, setIsSelectionMode } = useSelectionMode()
  const { preview, previewScale, previewOpacity, handleLongPress, handlePressOut } = usePreview()
  useBack( () => {
    if( isSelectionMode ) { setIsSelectionMode( false ) }
    else { return true }
  } )
  return (
    <AreaView style={ styles.container }>
      <View style={ styles.header }>
        <SelectionButton />
        <View style={ styles.headerButtons }>
          {
            isSelectionMode
              ? (
                <>
                  <SelectionCounter />
                  <SelectionMenuButton />
                </>
              )
              : (
                <>
                  <SortButton />
                  <ViewModeButton />
                </>
              )
          }
        </View>
      </View>
      <DrawingList handleLongPress={ handleLongPress } handlePressOut={ handlePressOut } />
      { ( preview !== null ) && <ItemPreview drawing={ preview } scale={ previewScale } opacity={ previewOpacity } /> }
      { !isSelectionMode && <AddPictureButton /> }
    </AreaView>
  )
}

const styles = StyleSheet.create( {

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  headerButtons: {
    height: 40,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

} )

export default App
