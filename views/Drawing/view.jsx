import AreaView from '@/components/AreaView/index'
import BackButton from '@/components/BackButton'
import Canvas from './components/Canvas'
import SaveButton from './components/SaveButton'
import { StyleSheet, Text, View } from 'react-native'
import { useCallback, useRef } from 'react'
import { useContent } from './hooks/content'
import { useDrawing } from './hooks/drawing'
import { useSaverHandler } from './hooks/saver_handler'
import { useTheme } from '@/hooks/theme'

/**
 * @import { CanvasObject } from './components/Canvas'
 * @import { ReactElement } from 'react'
 * @import { SaveEvent } from './components/SaveButton'
 */

/**
 * @returns { ReactElement }
 */
const Drawing = () => {

  const canvasRef = useRef( /** @type { CanvasObject | null } */ ( null ) )
  const content = useContent()
  const { name } = useDrawing()
  const { colors } = useTheme()

  const requestData = useCallback( async() => {
    const canvas = canvasRef.current
    if( canvas === null ) { return null }
    return canvas.requestImageData()
  }, [ canvasRef ] )

  const { disabled, setSavedData } = useSaverHandler( requestData )

  // Indicating to the saver handler that the canvas was saved to disable (temporally) saving function
  const handleSave = useCallback(
    /** @type { ( event:SaveEvent ) => void } */
    ( event ) => {
      const { data } = event
      setSavedData( data )
    }, [ setSavedData ] )

  return (
    <AreaView style={ styles.container }>
      <View style={ { flex:1 } }>
        <View style={ styles.header }>
          <BackButton />
          <Text style={ [ styles.title, { color:colors.text } ] }>
            { name }
          </Text>
          <SaveButton disabled={ disabled } dataRequester={ requestData } onSave={ handleSave } />
        </View>
        <View style={ styles.content }>
          <Canvas ref={ canvasRef } content={ content } aspectRatio="1:1" />
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

  title: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },

  content: {
    flex: 1,
  },

} )

export default Drawing
