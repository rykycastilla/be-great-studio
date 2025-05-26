import AddPictureButton from './components/AddPictureButton'
import AnimatedSafeArea from '@/components/AnimatedSafeArea'
import ScreenTransition from '@/components/ScreenTransition'
import { FadeIn } from 'react-native-reanimated'
import { useTheme } from '@/hooks/theme/index'
import { View, StyleSheet } from 'react-native'

export default function App() {
  const { colors } = useTheme()
  return (
    <ScreenTransition entering={ true }>
      <AnimatedSafeArea
        style={ [ styles.container, { backgroundColor:colors.background } ] }
        entering={ FadeIn.duration( 200 ) } >
        <View style={ styles.header } />
        <AddPictureButton />
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

} )
