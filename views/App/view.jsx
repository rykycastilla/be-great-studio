import AddPictureButton from './components/AddPictureButton'
import AreaView from '@/components/AreaView'
import ViewModeButton from './components/ViewModeButton'
import { DrawingList } from '@/contexts/drawing_list'
import { View, StyleSheet } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const App = () => {
  return (
    <AreaView style={ styles.container }>
      <View style={ styles.header }>
        <View style={ styles.headerButtons }>
          <ViewModeButton />
        </View>
      </View>
      <DrawingList />
      <AddPictureButton />
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
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

} )

export default App
