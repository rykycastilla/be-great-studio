import AnimatedSafeArea from '@/components/AnimatedSafeArea'
import BackButton from '@/components/BackButton'
import Canvas from './components/Canvas'
import ScreenTransition from '@/components/ScreenTransition'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@/hooks/theme/index'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const Drawing = () => {
  const { colors } = useTheme()
  return (
    <ScreenTransition entering={ true }>
      <AnimatedSafeArea
        style={ [ styles.container, { backgroundColor:colors.background } ] }
        entering={ FadeIn.duration( 200 ) }
        exiting={ FadeOut.duration( 150 ) }>
        <View style={ { flex:1 } }>
          <View style={ styles.header }>
            <BackButton />
          </View>
          <View style={ styles.content }>
            <Canvas aspectRatio="1:1" />
          </View>
        </View>
      </AnimatedSafeArea>
    </ScreenTransition>
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
