import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Tool } from 'react-native-drawing'
import { useModalConfig, useModalHider } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ToolOptionProps
 * @property { string } name
 * @property { () => void } onSelect
 */

/**
 * @param { ToolOptionProps } props
 * @returns { ReactElement }
 */
const ToolOption = ( props ) => {
  const { name, onSelect } = props
  const { colors } = useTheme()
  const hide = useModalHider()
  return (
    <TouchableOpacity
      style={[
        styles.modalOption,
        {
          backgroundColor: colors.primary,
          borderColor: colors.border,
          borderRadius: 8,
        },
      ]}
      onPress={ () => {
        onSelect()
        hide()
      } }>
      <Text style={ [ styles.modalOptionText, { color:colors.text } ] }>
        { name }
      </Text>
    </TouchableOpacity>
  )
}

/**
 * @typedef { object } ToolsModalProps
 * @property { [ setTool:( ( tool:Tool ) => void ) ] } args
 */

/**
 * @param { ToolsModalProps } props
 * @returns { ReactElement }
 */
const ToolsModal = ( props ) => {
  const { args } = props
  const [ setTool ] = args
  useModalConfig( { title:'Select a tool', hideButtons:true } )
  return (
    <View style={ styles.modalOptions }>
      <ToolOption name="Pencil" onSelect={ () => setTool( Tool.SQUARE_DOT_PEN ) } />
      <ToolOption name="Eraser" onSelect={ () => setTool( Tool.ERASER ) } />
      <ToolOption name="Filler" onSelect={ () => setTool( Tool.FILLER ) } />
    </View>
  )
}

const styles = StyleSheet.create( {

  modalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 70,
    alignItems: 'center',
  },

  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },

} )

export default ToolsModal
