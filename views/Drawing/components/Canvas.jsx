import { Draw } from 'react-native-drawing'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Resolver } from '@/utils/Resolver'
import { Size, useColor, useCurrentTool, useCurrentSize, useNewHistory } from '@/contexts/tools'
import { StyleSheet, View } from 'react-native'
import { useCanvasStyle } from '../hooks/canvas_style'

/**
 * @import { ForwardedRef, ReactElement } from 'react'
 */

/**
 * @typedef { object } CanvasProps
 * @property { string | null } [ content ]
 * @property { string } aspectRatio
 */

/**
 * @typedef { object } CanvasObject
 * @property { () => Promise<string|null> } requestImageData
 */

/**
 * A Canvas to draw
 * @param { string | null | undefined } props.content
 * - `null`: Does not set images, but stops the `Canvas#requestImageData` promise unitl content changes
 * - `string`: set the base64 image as canvas content
 * - `undefined`: Set a blank canvas
 */
const Canvas = forwardRef(
  /** @type { ( props:CanvasProps, ref:ForwardedRef<CanvasObject|null> ) => ReactElement } */
  ( props, ref ) => {

    const { content, aspectRatio } = props
    const canvasStyle = useCanvasStyle( aspectRatio )
    const drawRef = useRef( /** @type { Draw | null } */ ( null ) )
    const currentTool = useCurrentTool()
    const [ color ] = useColor()
    const currentSize = useCurrentSize()

    /* eslint-disable */
    const size =
      ( currentSize === Size.EXTRA_SMALL ) ? 1
      : ( currentSize === Size.SMALL ) ? 3
      : ( currentSize === Size.MEDIUM ) ? 5
      : ( currentSize === Size.BIG ) ? 7
      : ( currentSize === Size.GIANT ) ? 9
      : 5  // Using MEDIUM value by default
    /* eslint-enable */

    const avoidingNullContentRef = useRef(
      /** @type { Resolver<void> } */ ( /** @type { unknown } */ ( null ) ),
    )

    // Getting base64 drawing data
    const requestImageData = useCallback(
      /** @type { () => Promise<string|null> } */
      async() => {
        const draw = drawRef.current
        const avoidingNullContent = avoidingNullContentRef.current
        if( draw === null ) { return null }
        await avoidingNullContent.promise
        return draw.getImage()
      }, [ drawRef, avoidingNullContentRef ] )

    useImperativeHandle( ref, () => {
      return { requestImageData }
    } )

    // Updating content
    useEffect( () => {
      const draw = /** @type { Draw } */ ( drawRef.current )
      if( content === undefined ) { draw.clear() }
      else if( ( typeof content ) === 'string' ) { draw.setImage( content ) }
    }, [ drawRef, content ] )

    // Using promise (waiter) for null contents
    useEffect( () => {
      if( content === null ) { avoidingNullContentRef.current = new Resolver() }
      else { avoidingNullContentRef.current.resolve() }
    }, [ content, avoidingNullContentRef ] )

    // Creating history reference

    const undo = useCallback( () => {
      const draw = /** @type { Draw } */ ( drawRef.current )
      draw.undo()
    }, [ drawRef ] )

    const redo = useCallback( () => {
      const draw = /** @type { Draw } */ ( drawRef.current )
      draw.redo()
    }, [ drawRef ] )

    const [ canUndo, setCanUndo ] = useState( false )
    const [ canRedo, setCanRedo ] = useState( false )
    useNewHistory( { canUndo, canRedo, undo, redo } )

    return (
      <View
        style={ styles.canvasContainer }>
        <View style={ canvasStyle }>
          <Draw
            ref={ drawRef }
            resolution={ 32 }
            antialiasing={ false }
            color={ color }
            tool={ currentTool }
            toolSize={ size }
            onHistoryMove={ ( event ) => {
              const { canUndo, canRedo } = event
              setCanUndo( canUndo )
              setCanRedo( canRedo )
            } } />
        </View>
      </View>
    )

  } )

const styles = StyleSheet.create( {
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
} )

export default Canvas
