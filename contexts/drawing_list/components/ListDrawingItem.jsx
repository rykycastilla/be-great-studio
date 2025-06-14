import AnimatedTouchableOpacity from '@/components/AnimatedTouchableOpacity'
import PixelatedImage from '@/components/PixelatedImage'
import SelectionCircle from '@/components/SelectionCircle'
import { BUTTON_DEBOUNCE_DELAY } from '@/constants'
import { debounce } from '@/utils/debounce'
import { Layout } from 'react-native-reanimated'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { Drawing, SharedConfig } from '../models'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ListSelectionCircleProps
 * @property { boolean } isSelected
 */

/**
 * @param { ListSelectionCircleProps } props
 * @returns { ReactElement }
 */
const ListSelectionCircle = ( props ) => {
  const { isSelected } = props
  return (
    <View style={ styles.selectionCircleContainer }>
      <SelectionCircle isSelected={ isSelected } />
    </View>
  )
}

/**
 * @typedef { object } ThumbnailProps
 * @property { Drawing } drawing
 * @property { number } size
 */

/**
 * @param { ThumbnailProps } props
 * @returns { ReactElement }
 */
const Thumbnail = ( props ) => {
  const { drawing, size } = props
  const thumbnailSize = size * 1.5
  return (
    <View style={ [ styles.thumbnailContainer ] }>
      <PixelatedImage drawing={ drawing } width={ thumbnailSize } height={ thumbnailSize } />
    </View>
  )
}

/**
 * @typedef { object } InfoProps
 * @property { string } name
 * @property { Date } lastModified
 */

/**
 * @param { InfoProps } props
 * @returns { ReactElement }
 */
const Info = ( props ) => {
  const { name, lastModified } = props
  const { colors } = useTheme()
  return (
    <View style={ styles.info }>
      <Text style={ [ styles.name, { color:colors.text } ] } numberOfLines={ 1 }>
        { name }
      </Text>
      <Text style={ [ styles.date, { color:colors.inactive } ] }>
        { lastModified.toLocaleDateString() }
      </Text>
    </View>
  )
}

/**
 * @typedef { object } ListDrawingItemProps
 * @property { Drawing } item
 * @property { number } index
 * @property { SharedConfig } config
 */

/**
 * @param { ListDrawingItemProps } props
 * @returns { ReactElement }
 */
const ListDrawingItem = ( props ) => {

  const { item, config } = props
  const { id, name, lastModified } = item

  const {
    dimensions, colors, router, isSelectionMode, addItem, checkItemIncluded, deleteItem,
    handleLongPress, handlePressOut,
  } = config

  const isSelected = checkItemIncluded( id )
  const { width } = dimensions

  const toggleSelection = () => {
    if( isSelected ) { deleteItem( id ) }
    else { addItem( id ) }
  }

  const openDrawing = () => {
    router.push( `/drawing/${ id }` )
  }

  return (
    <AnimatedTouchableOpacity
      style={ [ styles.item, { width, backgroundColor:colors.card, borderColor: colors.border } ] }
      onPress={ isSelectionMode ? toggleSelection : debounce( openDrawing, BUTTON_DEBOUNCE_DELAY ) }
      onLongPress={ !isSelectionMode ? () => handleLongPress( item ) : undefined }
      onPressOut={ handlePressOut }
      layout={ Layout.springify() }>
      { isSelectionMode && <ListSelectionCircle isSelected={ isSelected } /> }
      <Thumbnail drawing={ item } size={ 24 } />
      <Info name={ name } lastModified={ lastModified } />
    </AnimatedTouchableOpacity>
  )

}

const styles = StyleSheet.create( {

  item: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    height: 80,
    position: 'relative',
  },

  thumbnailContainer: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  name: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },

  date: {
    fontSize: 12,
  },

  selectionCircleContainer: {
    top: '50%',
    marginLeft: 12,
    transform: [{ translateY: -12 }],
  },

} )

export default ListDrawingItem
