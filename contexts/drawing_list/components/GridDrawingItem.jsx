import AnimatedTouchableOpacity from '@/components/AnimatedTouchableOpacity'
import PixelatedImage from '@/components/PixelatedImage'
import SelectionCircle from '@/components/SelectionCircle'
import { AspectRatioAdapter } from '@/utils/AspectRatioAdapter'
import { BUTTON_DEBOUNCE_DELAY } from '@/constants'
import { debounce } from '@/utils/debounce'
import { Layout } from 'react-native-reanimated'
import { StyleSheet, Text, View } from 'react-native'

/**
 * @import { Drawing, SharedConfig } from '../models'
 * @import { ReactElement } from 'react'
 * @import { ThemeContext } from '@/contexts/theme'
 */

/**
 * @typedef { object } GridSelectionCircleProps
 * @property { boolean } isSelected
 */

/**
 * @param { GridSelectionCircleProps } props
 * @returns { ReactElement }
 */
const GridSelectionCircle = ( props ) => {
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
  const [ resolutionWidth, resolutionHeight ] = AspectRatioAdapter.adapt( 90, drawing.aspectRatio )
  return (
    <View
      style={ [ styles.thumbnailContainer, { width, height } ] }>
      <PixelatedImage drawing={ drawing } width={ resolutionWidth } height={ resolutionHeight } />
    </View>
  )
}

/**
 * @typedef { object } InfoProps
 * @property { string } name
 * @property { Date } lastModified
 * @property { ThemeContext[ 'colors' ] } colors
 */

/**
 * @param { InfoProps } props
 * @returns { ReactElement }
 */
const Info = ( props ) => {
  const { name, lastModified, colors } = props
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
 * @typedef { object } GridDrawingItemProps
 * @property { Drawing } item
 * @property { number } index
 * @property { SharedConfig } config
 */

/**
 * @param { GridDrawingItemProps } props
 * @returns { ReactElement }
 */
const GridDrawingItem = ( props ) => {

  const { item, index, config } = props
  const { id, name, lastModified } = item

  const {
    dimensions, colors, router, isSelectionMode, addItem, checkItemIncluded, deleteItem,
    handleLongPress, handlePressOut,
  } = config

  const isSelected = checkItemIncluded( id )
  const { width, spacing } = dimensions

  const toggleSelection = () => {
    if( isSelected ) { deleteItem( id ) }
    else { addItem( id ) }
  }

  const openDrawing = () => {
    router.push( `/drawing/${ id }` )
  }

  return (
    <AnimatedTouchableOpacity
      style={ [
        styles.item,
        {
          width,
          backgroundColor: colors.card,
          borderColor: colors.border,
          marginLeft: ( index % 2 === 0 ) ? 0 : spacing,
          marginRight: ( index % 2 === 1 ) ? 0 : 0,
        },
      ] }
      onPress={ isSelectionMode ? toggleSelection : debounce( openDrawing, BUTTON_DEBOUNCE_DELAY ) }
      onLongPress={ !isSelectionMode ? () => handleLongPress( item ) : undefined }
      onPressOut={ handlePressOut }
      layout={ Layout.springify() }>
      { isSelectionMode && <GridSelectionCircle isSelected={ isSelected } /> }
      <Thumbnail drawing={ item } size={ width } />
      <Info name={ name } lastModified={ lastModified } colors={ colors } />
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
    position: 'relative',
    alignItems: 'center',
  },

  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  info: {
    padding: 10,
    width: '100%',
  },

  name: {
    width: '100%',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },

  date: {
    fontSize: 12,
  },

  selectionCircleContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
  },

} )

export default GridDrawingItem
