import { Draw } from 'react-native-drawing'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { Resolver } from '@/utils/Resolver'
import { StyleSheet, View } from 'react-native'
import { useCanvasStyle } from '../hooks/canvas_style'
import { useCurrentTool } from '@/contexts/tools'

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

    return (
      <View
        style={ styles.canvasContainer }>
        <View style={ canvasStyle }>
          <Draw
            ref={ drawRef }
            resolution={ 32 }
            antialiasing={ false }
            color="lightblue"
            tool={ currentTool }
            toolSize={ 2 } />
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
