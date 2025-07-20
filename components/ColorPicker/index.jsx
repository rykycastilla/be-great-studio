import CancelButton from './components/CancelButton'
import Card from './components/Card'
import ColorInput from './components/ColorInput'
import ColorPreview from './components/ColorPreview'
import ColorWheel from './components/ColorWheel'
import ModalBackground from './components/ModalBackground'
import SelectButton from './components/SelectButton'
import { normalizeHex } from './functions/normalize_hex'
import { useLanguage } from '@/contexts/language'
import { useLayoutEffect, useState } from 'react'
import { useModalAnimations } from './hooks/modal_animations'
import { View, StyleSheet, Dimensions } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorPickerProps
 * @property { boolean } visible
 * @property { () => void } onClose
 * @property { ( color:string ) => void } onSelectColor
 * @property { string } initialColor
 */

/**
 * @param { ColorPickerProps } props
 * @returns { ReactElement | null }
 */
const ColorPicker = ( props ) => {

  const { visible, onClose, onSelectColor, initialColor } = props
  const [ wheelColor, setWheelColor ] = useState( /** @type { string | null } */ ( null ) )
  const [ selectedColor, setSelectedColor ] = useState( normalizeHex( initialColor ) )
  const [ hexInput, setHexInput ] = useState( initialColor.replace( '#', '' ) )
  const [ isValidInput, setIsValidInput ] = useState( true )
  const { shouldRender, scale, opacity } = useModalAnimations( visible )

  // Calculating elements size
  const screenWidth = Dimensions.get( 'window' ).width
  const cardWidth = Math.min( screenWidth - 40, 340 )
  const colorWheelSize = cardWidth - 80
  const { t } = useLanguage()

  // Using initialColor
  useLayoutEffect( () => {
    if( shouldRender ) { setHexInput( initialColor.replace( '#', '' ) ) }
  }, [ shouldRender ] )  // eslint-disable-line

  // Updating hex input when a new color is selected using the wheel
  useLayoutEffect( () => {
    if( wheelColor === null ) { return }
    setHexInput( wheelColor.replace( '#', '' ) )
  }, [ wheelColor ] )

  // Using valid hexInput as selected color
  useLayoutEffect( () => {
    if( isValidInput ) { setSelectedColor( `#${ hexInput }` ) }
  }, [ hexInput, isValidInput ] )

  // Setting selected color
  const handleConfirm = () => {
    onSelectColor( selectedColor )
    onClose()
  }

  if ( !shouldRender ) {
    return null
  }

  return (
    <ModalBackground isVisible={ shouldRender } opacity={ opacity } onClose={ onClose }>
      <Card width={ cardWidth } title={ t( 'color-picker' ) } scale={ scale }>
        <View style={ styles.wheelContainer }>
          <ColorWheel
            size={ colorWheelSize }
            showSelector={ selectedColor === wheelColor }
            onColorChange={ setWheelColor } />
        </View>
        <View style={ styles.previewContainer }>
          <ColorPreview color={ selectedColor } />
          <ColorInput
            value={ hexInput }
            handleValueChange={ setHexInput }
            handleIsValidInputChange={ setIsValidInput } />
        </View>
        <View style={ styles.buttonsContainer }>
          <CancelButton onClose={ onClose } />
          <SelectButton disabled={ !isValidInput } onConfirm={ handleConfirm } />
        </View>
      </Card>
    </ModalBackground>
  )
}

const styles = StyleSheet.create( {

  wheelContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },

  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },

} )

export default ColorPicker
