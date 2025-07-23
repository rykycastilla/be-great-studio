import { SafeView } from '@/contexts/window'
import AspectRatioControlButton from './components/AspectRatioControlButton'
import BackButton from '@/components/BackButton'
import Canvas from './components/Canvas'
import DrawingColorPicker from './components/DrawingColorPicker'
import Name from './components/Name'
import ResolutionControlButton from './components/ResolutionControlButton'
import SaveButton from './components/SaveButton'
import SaveWarningModal from './components/SaveWarningModal'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ToolsArea, ToolsProvider } from '@/contexts/tools'
import { useCallback, useRef } from 'react'
import { useColorPicker } from './hooks/color_picker'
import { useContent } from './hooks/content'
import { useDrawing } from './hooks/drawing'
import { useMinHeight } from './hooks/min_height'
import { useModal } from '@/contexts/modal'
import { useSaverHandler } from './hooks/saver_handler'

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
  const drawing = useDrawing()

  const {
    minHeightExceed, minHeightStyle, handleLayout,
  } = useMinHeight( Dimensions.get( 'window' ).height - 220 )

  const requestData = useCallback( async() => {
    const canvas = canvasRef.current
    if( canvas === null ) { return null }
    return canvas.requestImageData()
  }, [ canvasRef ] )

  const { disabled:savingIsUnnecessary, setSavedData } = useSaverHandler( requestData )

  // Indicating to the saver handler that the canvas was saved to disable (temporally) saving function
  const handleSave = useCallback(
    /** @type { ( event:SaveEvent ) => void } */
    ( event ) => {
      const { data } = event
      setSavedData( data )
    }, [ setSavedData ] )

  const dispatchSaveWarningModal = useModal( 'exit-save-warning', SaveWarningModal, {} )

  const backButtonFallback = useCallback( () => {
    dispatchSaveWarningModal()
  }, [ dispatchSaveWarningModal ] )

  const colorPicker = useColorPicker()
  const { dispatchColorPicker } = colorPicker

  return (
    <ToolsProvider id={ drawing.id }>
      <SafeView style={ styles.container }>
        <View style={ { flex:1 } }>
          <View style={ styles.header }>
            <BackButton blockNavigation={ !savingIsUnnecessary } fallback={ backButtonFallback } />
            <Name drawing={ drawing } />
            <SaveButton
              drawing={ drawing }
              disabled={ savingIsUnnecessary }
              dataRequester={ requestData }
              onSave={ handleSave } />
          </View>
          { /* Calculating if content has a safe height (to avoid collisions with tools area) */ }
          <View style={ [ styles.content, minHeightStyle ] } onLayout={ handleLayout }>
            <View style={ styles.canvasControls }>
              <AspectRatioControlButton drawing={ drawing } />
              <ResolutionControlButton drawing={ drawing } />
            </View>
            <Canvas
              ref={ canvasRef }
              content={ content }
              resolution={ drawing.resolution }
              aspectRatio={ drawing.aspectRatio } />
          </View>
          { /* If min height was exceed the content will collide with tools area, to avoid it, the tools area must collapse */ }
          <ToolsArea collapsable={ minHeightExceed } dispatchColorPicker={ dispatchColorPicker } />
        </View>
      </SafeView>
      <DrawingColorPicker { ...colorPicker } />
    </ToolsProvider>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  canvasControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },

} )

export default Drawing
