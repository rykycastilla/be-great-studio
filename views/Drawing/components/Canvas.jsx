import TouchableView from '@/components/TouchableView'
import { calcAspectRatio } from '@/utils/calc_aspect_ratio'
import { Draw } from 'react-native-drawing'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Resolver } from '@/utils/Resolver'
import { rgbaToHex } from '@/utils/rgba_to_hex'
import { Size, useColorList, useCurrentColor, useCurrentTool, useCurrentSize, useNewHistory } from '@/contexts/tools'
import { Table } from '@/utils/Table'
import { useCanvasStyle } from '../hooks/canvas_style'
import { useSettings } from '@/contexts/settings'

/**
 * @import { ForwardedRef, ReactElement } from 'react'
 * @import { LayoutChangeEvent } from 'react-native'
 */

/** @type { Table<Size,number,number> } */ const sizeMatrix = new Table()

sizeMatrix.set( Size.EXTRA_SMALL, 16, 1 )
sizeMatrix.set( Size.EXTRA_SMALL, 32, 1 )
sizeMatrix.set( Size.EXTRA_SMALL, 64, 1 )

sizeMatrix.set( Size.SMALL, 16, 2 )
sizeMatrix.set( Size.SMALL, 32, 3 )
sizeMatrix.set( Size.SMALL, 64, 5 )

sizeMatrix.set( Size.MEDIUM, 16, 3 )
sizeMatrix.set( Size.MEDIUM, 32, 5 )
sizeMatrix.set( Size.MEDIUM, 64, 9 )

sizeMatrix.set( Size.BIG, 16, 4 )
sizeMatrix.set( Size.BIG, 32, 7 )
sizeMatrix.set( Size.BIG, 64, 13 )

sizeMatrix.set( Size.GIANT, 16, 5 )
sizeMatrix.set( Size.GIANT, 32, 9 )
sizeMatrix.set( Size.GIANT, 64, 18 )

/**
 * @typedef { object } CanvasProps
 * @property { string | null } [ content ]
 * @property { number } resolution
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

    const { content, resolution, aspectRatio } = props
    const canvasStyle = useCanvasStyle( aspectRatio )
    const drawRef = useRef( /** @type { Draw | null } */ ( null ) )
    const currentTool = useCurrentTool()
    const currentColor = useCurrentColor()
    const currentSize = useCurrentSize()
    const { createColor } = useColorList()
    const size = /** @type { number } */ ( sizeMatrix.get( currentSize, resolution ) )

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

    // Using touch indicator size
    const [ width, setWidth ] = useState( 0 )
    const indicatorSize = size / resolution * width

    /** @type { ( event:LayoutChangeEvent ) => void } */
    const handleLayout = useCallback( ( event ) => {
      const { layout } = event.nativeEvent
      setWidth( layout.width )
    }, [] )

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

    const { showTouchCursor } = useSettings()

    return (
      <TouchableView
        touchIndicatorSize={ indicatorSize }
        disabled={ !showTouchCursor }
        style={ canvasStyle }
        onLayout={ handleLayout }>
        <Draw
          ref={ drawRef }
          resolution={ resolution }
          aspectRatio={ calcAspectRatio( aspectRatio ) }
          antialiasing={ false }
          color={ currentColor }
          tool={ currentTool }
          toolSize={ size }
          onHistoryMove={ ( event ) => {
            const { canUndo, canRedo } = event
            setCanUndo( canUndo )
            setCanRedo( canRedo )
          } }
          onEyeDropper={ ( event ) => {
            const hex = rgbaToHex( event.color )
            createColor( hex )
          } } />
      </TouchableView>
    )

  } )

export default Canvas
