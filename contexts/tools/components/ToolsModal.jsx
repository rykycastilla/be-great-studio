import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, Text, View } from 'react-native'
import { Tool } from 'react-native-drawing'
import { useLanguage } from '@/contexts/language'
import { useModalConfig, useModalHider } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'
import { useToolIcon } from '../hooks/tool_icon'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ToolOptionProps
 * @property { string } name
 * @property { Tool } tool
 * @property { ( tool:Tool ) => void } onToolChange
 */

/**
 * @param { ToolOptionProps } props
 * @returns { ReactElement }
 */
const ToolOption = ( props ) => {
  const { name, tool, onToolChange:setTool } = props
  const { colors } = useTheme()
  const hide = useModalHider()
  const icon = useToolIcon( tool )
  return (
    <TouchableOpacity
      style={ [
        styles.modalOption,
        {
          backgroundColor: colors.primary,
          borderColor: colors.border,
          borderRadius: 8,
        },
      ] }
      onPress={ () => {
        setTool( tool )
        hide()
      } }>
      <Ionicons name={ icon } size={ 18 } color="#FFFFFF" />
      <Text adjustsFontSizeToFit style={ [ styles.modalOptionText ] }>
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
  const { t } = useLanguage()
  useModalConfig( { title:t( 'select-tool' ), hideButtons:true } )
  return (
    <View style={ styles.modalOptions }>
      <ToolOption name={ t( 'pencil' ) } tool={ Tool.SQUARE_DOT_PEN } onToolChange={ setTool } />
      <ToolOption name={ t( 'eraser' ) } tool={ Tool.ERASER } onToolChange={ setTool } />
      <ToolOption name={ t( 'filler' ) } tool={ Tool.FILLER } onToolChange={ setTool } />
      { /** Pencil is used to emulate pencil style because of its effect in pixel art */ }
      <ToolOption name={ t( 'brush' ) } tool={ Tool.PENCIL } onToolChange={ setTool } />
    </View>
  )
}

const styles = StyleSheet.create( {

  modalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  modalOptionText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

} )

export default ToolsModal
