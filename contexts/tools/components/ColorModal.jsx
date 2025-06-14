import AddColorButton from './AddColorButton'
import ColorOption from './ColorOption'
import { StyleSheet, View } from 'react-native'
import { useModalConfig } from '@/contexts/modal'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ColorModalProps
 * @property { string[] } colorList
 * @property { string } currentColor
 * @property { ( currentColor:string ) => void } setCurrentColor
 * @property { ( color:string ) => void } dispatchColorPicker
 */

/**
 * @param { ColorModalProps } props
 * @returns { ReactElement }
 */
const ColorModal = ( props ) => {
  const { colorList, currentColor, setCurrentColor, dispatchColorPicker } = props
  useModalConfig( { title:'Select a color', hideButtons:true } )
  return (
    <View style={ styles.colorGrid }>
      {
        colorList.map( ( color ) => (
          <ColorOption
            key={ color }
            color={ color }
            currentColor={ currentColor }
            setCurrentColor={ setCurrentColor } />
        ) )
      }
      <AddColorButton dispatchColorPicker={ () => dispatchColorPicker( currentColor ) } />
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
