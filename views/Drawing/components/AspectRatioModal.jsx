import WarningModal from './WarningModal'
import { optionList } from '@/views/Settings/data/aspect_ratio.json'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useLanguage } from '@/contexts/language'
import { useModal, useModalConfig, useModalHider } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'
import { wait } from '@/utils/wait'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } AspectRatioOptionProps
 * @property { string } value
 * @property { ( aspectRatio:string ) => void } onAspectRatioChange
 */

/**
 * @param { AspectRatioOptionProps } props
 * @returns { ReactElement }
 */
const AspectRatioOption = ( props ) => {

  const { value, onAspectRatioChange:setAspectRatio } = props
  const { colors } = useTheme()
  const hide = useModalHider()
  const dispatchWarningModal = useModal( 'aspect-ratio-warning', WarningModal, {} )
  const { t } = useLanguage()

  const handleAspectRatioSelection = async() => {
    hide()
    await wait( 1000 )
    dispatchWarningModal(
      t( 'aspect-ratio-warning' ),
      t( 'aspect-ratio-warning-description' ),
      () => setAspectRatio( value ),
    )
  }

  return (
    <TouchableOpacity
      style={ [ styles.modalOption, { borderColor:colors.border } ] }
      onPress={ handleAspectRatioSelection }>
      <Text style={ [ styles.modalOptionText, { color:colors.text } ] }>
        { value }
      </Text>
    </TouchableOpacity>
  )

}

/**
 * @typedef { object } AspectRatioModalProps
 * @property { ( aspectRatio:string ) => void } onAspectRatioChange
 */

/**
 * @param { AspectRatioModalProps } props
 * @returns { ReactElement }
 */
const AspectRatioModal = ( props ) => {
  const { onAspectRatioChange:setAspectRatio } = props
  const { t } = useLanguage()
  useModalConfig( { title:t( 'select-aspect-ratio' ), hideButtons:true } )
  return (
    <View style={styles.modalOptions}>
      { optionList.map( ( { value } ) => (
        <AspectRatioOption
          key={ value }
          value={ value }
          onAspectRatioChange={ setAspectRatio } />
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

export default AspectRatioModal
