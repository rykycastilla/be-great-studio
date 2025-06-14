import ColorSelector from './ColorSelector'
import Svg, { Circle, Defs, RadialGradient, Stop, Path } from 'react-native-svg'
import { angle } from '../functions/angle'
import { distance } from '../functions/distance'
import { hsvToRgb } from '../functions/hsv_to_rgb'
import { rgbToHex } from '../functions/rgb_to_hex'
import { StyleSheet, View } from 'react-native'
import { useColorEvent } from '../hooks/color_event'
import { useMemo, useState } from 'react'
import { usePanResponder } from '../hooks/pan_responder'

/**
 * @import { Position } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorWheelProps
 * @property { number } size
 * @property { boolean } showSelector
 * @property { ( color:string ) => void } onColorChange
 */

/**
 * @param { ColorWheelProps } props
 * @returns { ReactElement }
 */
const ColorWheel = ( props ) => {

  const { size, showSelector, onColorChange } = props
  const centerX = size / 2
  const centerY = size / 2
  const [ selectorPosition, setSelectorPosition ] = useState( /** @type { Position | null } */ ( null ) ) // Initilaizing position
  const radius = size / 2 - 10

  const selectorColor = useMemo( () => {
    if( selectorPosition === null ) { return null }
    const { x, y } = selectorPosition
    const dist = Math.min( distance( x, y, centerX, centerY ) / radius, 1 )
    const angleRad = angle( centerX, centerY, x, y )
    // Hue: angle (0-1), Saturation: distance (0-1), Value: 1
    const hue = angleRad / ( 2 * Math.PI )
    const saturation = dist
    const value = 1.0
    // To HSV from RGB and then to HEX
    const [r, g, b] = hsvToRgb( hue, saturation, value )
    return rgbToHex( r, g, b )
  }, [ selectorPosition, centerX, centerY, radius ] )

  useColorEvent( selectorColor, onColorChange )

  // Updating selector position and emitting color event
  const panResponder = usePanResponder( ( x, y ) => {
    const dist = distance( x, y, centerX, centerY )
    // Avoiding out of wheel selections
    if ( dist > radius ) { return }
    setSelectorPosition( { x, y } )
  } )

  // Generating color segments of the wheel
  const generateColorWheelSegments = () => {
    const segments = []
    const segmentCount = 16  // Color segments amount of the wheel
    const segmentAngle = ( 2 * Math.PI ) / segmentCount
    for( let i = 0; i < segmentCount; i++ ) {
      const startAngle = i * segmentAngle
      const endAngle = ( i + 1 ) * segmentAngle
      const startX = centerX + radius * Math.cos( startAngle )
      const startY = centerY + radius * Math.sin( startAngle )
      const endX = centerX + radius * Math.cos( endAngle )
      const endY = centerY + radius * Math.sin( endAngle )
      // Creating segments path
      const path = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`
      // Calculating segments color
      const hue = i / segmentCount
      const [r, g, b] = hsvToRgb( hue, 1, 1 )
      const color = rgbToHex( r, g, b )
      segments.push( <Path key={i} d={path} fill={color} /> )
    }
    return segments
  }

  return (
    <View style={ [ styles.container, { width:size, height:size } ] } { ...panResponder.panHandlers }>
      <Svg width={ size } height={ size } viewBox={ `0 0 ${ size } ${ size }` }>
        { generateColorWheelSegments() }
        <Circle
          cx={ centerX }
          cy={ centerY }
          r={ radius }
          fill="url(#saturationGradient)"
          fillOpacity="1" />
        <Defs>
          <RadialGradient id="saturationGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>
      </Svg>
      {
        ( showSelector && ( selectorColor !== null ) && ( selectorPosition !== null ) ) &&
        <ColorSelector color={ selectorColor } position={ selectorPosition } />
      }
    </View>
  )
}

const styles = StyleSheet.create( {
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    overflow: 'hidden',
  },
} )

export default ColorWheel

