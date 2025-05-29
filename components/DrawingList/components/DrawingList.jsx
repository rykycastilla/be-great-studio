import GridDrawingItem from './GridDrawingItem'
import ListDrawingItem from './ListDrawingItem'
import { FlatList, StyleSheet, View } from 'react-native'
import { useItemDimensions } from '../hooks/item_dimensions'

import { useDrawingList } from '../hooks/drawing_list'
import { useViewMode } from '../hooks/view_mode'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } SeparatorProps
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
 * @returns { ReactElement }
 */
const DrawingList = () => {

  const [ viewMode ] = useViewMode()
  const { drawingList } = useDrawingList()
  const { spacing } = useItemDimensions( viewMode )

  return (
    <FlatList
      data={ drawingList }
      renderItem={ ( viewMode === 'grid' ) ? GridDrawingItem : ListDrawingItem }
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

