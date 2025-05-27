import AreaView from '@/components/AreaView/index'
import BackButton from '@/components/BackButton'
import Canvas from './components/Canvas'
import { StyleSheet, View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const Drawing = () => {
  return (
    <AreaView style={ styles.container }>
      <View style={ { flex:1 } }>
        <View style={ styles.header }>
          <BackButton />
        </View>
        <View style={ styles.content }>
          <Canvas aspectRatio="1:1" />
        </View>
      </View>
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

  content: {
    flex: 1,
  },

} )

export default Drawing
