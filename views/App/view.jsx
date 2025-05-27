import AddPictureButton from './components/AddPictureButton'
import AreaView from '@/components/AreaView/index'
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
      <View style={ styles.header } />
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

} )

export default App
