import AnimatedTouchableOpacity from '@/components/AnimatedTouchableOpacity'
import PixelatedImage from '@/components/PixelatedImage'
import SelectionCircle from '@/components/SelectionCircle'
import { AspectRatioAdapter } from '@/utils/AspectRatioAdapter'
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
  const [ width, height ] = AspectRatioAdapter.adapt( size, drawing.aspectRatio )
  return (
    <View style={ [ styles.thumbnailContainer ] }>
      <PixelatedImage drawing={ drawing } width={ width * 1.5 } height={ height * 1.5 } />
    </View>
  )
}

/**
 * @typedef { object } InfoProps
 * @property { Drawing } drawing
 */

/**
 * @param { InfoProps } props
 * @returns { ReactElement }
 */
const Info = ( props ) => {
  const { drawing } = props
  const { name, lastModified, resolution, aspectRatio } = drawing
  const { colors } = useTheme()
  return (
    <View style={ styles.info }>
      <Text adjustsFontSizeToFit style={ [ styles.name, { color:colors.text } ] } numberOfLines={ 1 }>
        { name }
      </Text>
      <Text adjustsFontSizeToFit style={ [ styles.extraInfo, { color:colors.inactive } ] }>
        { lastModified.toLocaleDateString() }   { resolution }px { aspectRatio }
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
  const { id } = item

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
      onPress={ isSelectionMode ? toggleSelection : openDrawing }
      onLongPress={ !isSelectionMode ? () => handleLongPress( item ) : undefined }
      onPressOut={ handlePressOut }
      layout={ Layout.springify() }>
      { isSelectionMode && <ListSelectionCircle isSelected={ isSelected } /> }
      <Thumbnail drawing={ item } size={ 24 } />
      <Info drawing={ item } />
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

  extraInfo: {
    fontSize: 12,
  },

  selectionCircleContainer: {
    top: '50%',
    marginLeft: 12,
    transform: [{ translateY: -12 }],
  },

} )

export default ListDrawingItem
