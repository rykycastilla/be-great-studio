import SortIcon from './SortIcon'
import TouchableOpacity from '@/components/TouchableOpacity'
import { SortCategory, useSort } from '@/contexts/drawing_list'
import { StyleSheet, Text } from 'react-native'
import { useLanguage } from '@/contexts/language'
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
      <Text adjustsFontSizeToFit style={ [ styles.itemText, { color:colors.text } ] }>{ children }</Text>
    </TouchableOpacity>
  )
}

/**
 * @returns { ReactElement }
 */
const SortModal = () => {
  const { t } = useLanguage()
  useModalConfig( { title:t( 'sorting' ), hideButtons:true } )
  return (
    <>
      <Item category={ SortCategory.ALPHABETICAL } ascending={ true }>
        { t( 'alphabetical-ascending' ) }
      </Item>
      <Item category={ SortCategory.ALPHABETICAL } ascending={ false }>
        { t( 'alphabetical-descending' ) }
      </Item>
      <Item category={ SortCategory.DATE } ascending={ true }>
        { t( 'by-date-ascending' ) }
      </Item>
      <Item category={ SortCategory.DATE } ascending={ false }>
        { t( 'by-date-descending' ) }
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
