import ColorOption from './ColorOption'
import { StyleSheet, View } from 'react-native'
import { useModalConfig } from '@/contexts/modal'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorModalProps
 * @property { string } currentColor
 * @property { ( currentColor:string ) => void } setCurrentColor
 */

/**
 * @param { ColorModalProps } props
 * @returns { ReactElement }
 */
const ColorModal = ( props ) => {
  const { currentColor, setCurrentColor } = props
  useModalConfig( { title:'Select a color', hideButtons:true } )
  return (
    <View style={ styles.colorGrid }>
      <ColorOption
        color="#A60AFF"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#FF0A0A"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#FF840A"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#FFD30A"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#0AFF84"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#0AD3FF"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#0A84FF"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#1A1A1A"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
      <ColorOption
        color="#F0F0F0"
        currentColor={ currentColor }
        setCurrentColor={ setCurrentColor } />
    </View>
  )
}

const styles = StyleSheet.create( {
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
} )

export default ColorModal
