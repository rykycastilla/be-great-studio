import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SelectionItemProps
 * @property { any } value
 * @property { string } preview
 * @property { string } description
 * @property { any } selected
 * @property { ( value:any ) => void } onSelectedChange
 */

/**
 * @param { SelectionItemProps } props
 * @returns { ReactElement }
 */
const SelectionItem = ( props ) => {
  const { value, preview, description, selected, onSelectedChange:setSelected } = props
  const isSelected = value === selected
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      key={ value }
      style={ [ styles.item, { backgroundColor:colors.card, borderColor:colors.border } ] }
      onPress={ () => setSelected( value ) }
      activeOpacity={ 0.7 }>
      <View>
        <Text style={ [ styles.preview, { color:colors.text } ] }>{ preview }</Text>
        <Text style={ [ styles.description, { color:colors.inactive } ] }>{ description }</Text>
      </View>
      { isSelected && <Ionicons name="checkmark" size={ 22 } color={ colors.primary } /> }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
  },

  preview: {
    fontSize: 16,
    fontWeight: '500',
  },

  description: {
    maxWidth: 300,
    fontSize: 14,
    marginTop: 2,
  },

} )

export default SelectionItem
