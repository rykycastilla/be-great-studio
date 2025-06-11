import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useHistory } from '../hooks/history'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } HistoryButtonProps
 * @property { 'arrow-undo-outline' | 'arrow-redo-outline' } icon
 * @property { boolean } canGo
 * @property { () => void } go
 */

/**
 * @param { HistoryButtonProps } props
 * @returns { ReactElement }
 */
const HistoryButton = ( props ) => {
  const { icon, canGo, go } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={ [ styles.historyButton, { borderColor:colors.border, opacity:( canGo ? 1 : 0.4 ) } ] }
      disabled={ !canGo }
      onPress={ go }>
      <Ionicons name={ icon } size={ 22 } color={ colors.text } />
    </TouchableOpacity>
  )
}

/**
 * @returns { ReactElement }
 */
const HistoryButtons = () => {
  const { canUndo, canRedo, undo, redo } = useHistory()
  return (
    <>
      <HistoryButton
        icon="arrow-undo-outline"
        canGo={ canUndo }
        go={ undo } />
      <HistoryButton
        icon="arrow-redo-outline"
        canGo={ canRedo }
        go={ redo } />
    </>
  )
}

const styles = StyleSheet.create( {
  historyButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
} )

export default HistoryButtons
