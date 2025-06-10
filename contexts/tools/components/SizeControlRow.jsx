import SizeButton from './SizeButton'
import { Size } from '../models'
import { StyleSheet, View } from 'react-native'
import { Tool } from 'react-native-drawing'
import { useCurrentTool } from '../hooks/current_tool'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const SizeControlRow = () => {
  const currentTool = useCurrentTool()
  const buttonsDisabled = currentTool === Tool.FILLER || currentTool === Tool.EYE_DROPPER || currentTool === Tool.ZOOM
  return (
    <View
      style={
        [ styles.sizeButtonsContainer, { opacity: buttonsDisabled ? 0.3 : 1, marginBottom: 16 } ]
      }>
      {
        Object.values( Size ).map( ( size ) => {
          if( typeof size === 'string' ) { return null }
          return <SizeButton key={ size } target={ size } disabled={ buttonsDisabled } />
        } )
      }
    </View>

  )
}

const styles = StyleSheet.create( {
  sizeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
} )

export default SizeControlRow
