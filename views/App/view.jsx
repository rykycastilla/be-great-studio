import AddPictureButton from './components/AddPictureButton'
import AreaView from '@/components/AreaView'
import SelectionButton from './components/SelectionButton'
import SelectionCounter from './components/SelectionCounter'
import SelectionMenuButton from './components/SelectionMenuButton'
import ViewModeButton from './components/ViewModeButton'
import { DrawingList, useSelectionMode } from '@/contexts/drawing_list'
import { View, StyleSheet } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const App = () => {
  const { isSelectionMode } = useSelectionMode()
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
              : <ViewModeButton />
          }
        </View>
      </View>
      <DrawingList />
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
