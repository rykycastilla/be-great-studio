import { Draw, Tool } from 'react-native-drawing'
import { StyleSheet, View } from 'react-native'
import { useCanvasStyle } from '../hooks/canvas_style'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } CanvasProps
 * @property { string } aspectRatio
 */

/**
 * @param { CanvasProps } props
 * @returns { ReactElement }
 */
const Canvas = ( props ) => {
  const { aspectRatio } = props
  const canvasStyle = useCanvasStyle( aspectRatio )
  return (
    <View
      style={ styles.canvasContainer }>
      <View style={ canvasStyle }>
        <Draw
          resolution={ 32 }
          antialiasing={ false }
          color="lightblue"
          tool={ Tool.SQUARE_DOT_PEN }
          toolSize={ 2 } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
} )

export default Canvas
