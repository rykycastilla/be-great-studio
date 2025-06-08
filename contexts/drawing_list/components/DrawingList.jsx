import GridDrawingItem from './GridDrawingItem'
import ListDrawingItem from './ListDrawingItem'
import { FlatList, StyleSheet, View } from 'react-native'
import { useItemDimensions } from '../hooks/item_dimensions'
import { useRouter } from 'expo-router'
import { useSelectionMode } from '../hooks/selection_mode'
import { useSortedList } from '../hooks/sorted_list'
import { useTheme } from '@/contexts/theme'
import { useViewMode } from '../hooks/view_mode'

/**
 * @import { Drawing } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SeparatorProps
 * @property { number } spacing
 */

/**
 * @param { SeparatorProps } props
 * @returns { ReactElement }
 */
const Separator = ( props ) => {
  const { spacing } = props
  return <View style={ { height:spacing } } />
}

/**
 * @typedef { object } DrawingListProps
 * @property { ( item:Drawing ) => void } handleLongPress
 * @property { () => void } handlePressOut
 */

/**
 * @param { DrawingListProps } props
 * @returns { ReactElement }
 */
const DrawingList = ( props ) => {

  // Basic list config
  const { handleLongPress, handlePressOut } = props
  const [ viewMode ] = useViewMode()
  const drawingList = useSortedList()
  const dimensions = useItemDimensions( viewMode )
  const { spacing } = dimensions

  // Shared config
  const { colors } = useTheme()
  const router = useRouter()
  const { isSelectionMode, addItem, checkItemIncluded, deleteItem } = useSelectionMode()
  const config = {
    dimensions, colors, router, isSelectionMode,
    addItem, checkItemIncluded, deleteItem,
    handleLongPress, handlePressOut,
  }

  const Item = ( viewMode === 'grid' ) ? GridDrawingItem : ListDrawingItem

  return (
    <FlatList
      data={ drawingList }
      renderItem={ ( props ) => <Item { ...props } config={ config } /> }
      keyExtractor={ ( item ) => item.id }
      contentContainerStyle={[styles.drawingList, { paddingHorizontal: 16 }]}
      numColumns={ ( viewMode === 'grid' ) ? 2 : 1 }
      key={ viewMode }
      showsVerticalScrollIndicator={ false }
      bounces={ true }
      ItemSeparatorComponent={ () => <Separator spacing={ spacing } /> }
      columnWrapperStyle={ ( viewMode === 'grid' ) ? styles.columnWrapper : undefined } />
  )

}

const styles = StyleSheet.create( {

  drawingList: {
    paddingTop: 8,
    paddingBottom: 80,
  },

  columnWrapper: {
    justifyContent: 'flex-start',
  },

} )

export default DrawingList

