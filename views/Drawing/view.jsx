import AreaView from '@/components/AreaView'
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
      <AreaView style={ styles.container }>
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
          <View style={ styles.content }>
            <View style={ styles.canvasControls }>
              <ResolutionControlButton drawing={ drawing } />
            </View>
            <Canvas
              ref={ canvasRef }
              content={ content }
              resolution={ drawing.resolution }
              aspectRatio={ drawing.aspectRatio } />
          </View>
          <ToolsArea dispatchColorPicker={ dispatchColorPicker } />
        </View>
      </AreaView>
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
    minHeight: Dimensions.get( 'window' ).height - 220,
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
