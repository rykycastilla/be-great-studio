import GridDrawingItem from './GridDrawingItem'
import ListDrawingItem from './ListDrawingItem'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDrawingList } from '../hooks/drawing_list'
import { useItemDimensions } from '../hooks/item_dimensions'
import { useRouter } from 'expo-router'
import { useTheme } from '@/contexts/theme'
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

  // Basic list config
  const [ viewMode ] = useViewMode()
  const { drawingList } = useDrawingList()
  const dimensions = useItemDimensions( viewMode )
  const { spacing } = dimensions

  // Shared config
  const { colors } = useTheme()
  const router = useRouter()
  const config = { dimensions, colors, router }

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

