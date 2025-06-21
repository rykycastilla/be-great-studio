import WarningModal from './WarningModal'
import { optionList } from '@/views/Settings/data/resolution.json'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useModal, useModalConfig, useModalHider } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'
import { wait } from '@/utils/wait'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ResolutionOptionProps
 * @property { number } value
 * @property { ( resolution:number ) => void } onResolutionChange
 */

/**
 * @param { ResolutionOptionProps } props
 * @returns { ReactElement }
 */
const ResolutionOption = ( props ) => {

  const { value, onResolutionChange:setResolution } = props
  const { colors } = useTheme()
  const hide = useModalHider()
  const dispatchWarningModal = useModal( 'resolution-warning', WarningModal, {} )

  const handleResolutionSelection = async() => {
    hide()
    await wait( 1000 )
    dispatchWarningModal(
      'Resolution warning',
      'Are you sure you want to change the resolution of the drawing? This action will reset the changes history and modify the canvas',
      () => setResolution( value ),
    )
  }

  return (
    <TouchableOpacity
      style={ [ styles.modalOption, { borderColor:colors.border } ] }
      onPress={ handleResolutionSelection }>
      <Text style={ [ styles.modalOptionText, { color:colors.text } ] }>
        { value }px
      </Text>
    </TouchableOpacity>
  )

}

/**
 * @typedef { object } ResolutionModalProps
 * @property { ( resolution:number ) => void } onResolutionChange
 */

/**
 * @param { ResolutionModalProps } props
 * @returns { ReactElement }
 */
const ResolutionModal = ( props ) => {
  const { onResolutionChange:setResolution } = props
  useModalConfig( { title:'Select the resolution', hideButtons:true } )
  return (
    <View style={styles.modalOptions}>
      { optionList.map( ( { value } ) => (
        <ResolutionOption
          key={ value }
          value={ value }
          onResolutionChange={ setResolution } />
      ) ) }
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
  },

  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },

} )

export default ResolutionModal
