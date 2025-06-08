import SortIcon from './SortIcon'
import { SortCategory, useSort } from '@/contexts/drawing_list'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useModalConfig, useModalHider } from '@/contexts/modal'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ItemProps
 * @property { string } children
 * @property { SortCategory } category
 * @property { boolean } ascending
 */

/**
 * @param { ItemProps } props
 * @returns { ReactElement }
 */
const Item = ( props ) => {
  const { children, category, ascending } = props
  const sort = { category, ascending }
  const { colors } = useTheme()
  const hide = useModalHider()
  const [ , setSort ] = useSort()
  return (
    <TouchableOpacity
      style={ styles.item }
      onPress={
        () => {
          hide()
          setSort( sort )
        }
      }>
      <SortIcon sort={ sort } size={ 16 } color={ colors.text } />
      <Text style={ [ styles.itemText, { color:colors.text } ] }>{ children }</Text>
    </TouchableOpacity>
  )
}

/**
 * @returns { ReactElement }
 */
const SortModal = () => {
  useModalConfig( { title:'Sorting', hideButtons:true } )
  return (
    <>
      <Item category={ SortCategory.ALPHABETICAL } ascending={ true }>
        Alphabetical (Ascending)
      </Item>
      <Item category={ SortCategory.ALPHABETICAL } ascending={ false }>
        Alphabetical (Descending)
      </Item>
      <Item category={ SortCategory.DATE } ascending={ true }>
        By Date (Ascending)
      </Item>
      <Item category={ SortCategory.DATE } ascending={ false }>
        By Date (Descending)
      </Item>
    </>
  )
}

const styles = StyleSheet.create( {

  item: {
    flexDirection: 'row',
  },

  itemText: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 12,
    marginBottom: 20,
    lineHeight: 22,
  },

} )

export default SortModal
