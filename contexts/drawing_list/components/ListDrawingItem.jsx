import AnimatedTouchableOpacity from '@/components/AnimatedTouchableOpacity'
import SelectionCircle from './SelectionCircle'
import { BUTTON_DEBOUNCE_DELAY } from '@/constants'
import { debounce } from '@/utils/debounce'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Layout } from 'react-native-reanimated'

/**
 * @import { Drawing, SharedConfig } from '../models'
 * @import { ReactElement } from 'react'
 * @import { ThemeContext } from '@/contexts/theme'
 */

/**
 * @typedef { object } ListSelectionCircleProps
 * @property { boolean } isSelected
 * @property { ThemeContext[ 'colors' ] } colors
 */

/**
 * @param { ListSelectionCircleProps } props
 * @returns { ReactElement }
 */
const ListSelectionCircle = ( props ) => {
  const { isSelected, colors } = props
  return (
    <View style={ styles.selectionCircleContainer }>
      <SelectionCircle isSelected={ isSelected } colors={ colors } />
    </View>
  )
}

/**
 * @typedef { object } ThumbnailProps
 * @property { string } src
 * @property { number } size
 */

/**
 * @param { ThumbnailProps } props
 * @returns { ReactElement }
 */
const Thumbnail = ( props ) => {
  const { src, size } = props
  const thumbnailSize = size * 1.5
  return (
    <View style={ [ styles.thumbnailContainer ] }>
      <Image src={ src } width={ thumbnailSize } height={ thumbnailSize } resizeMode="cover" />
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
  const { id, name, thumbnail, lastModified } = item
  const { dimensions, colors, router, isSelectionMode, selectionList, setSelectionList } = config
  const isSelected = selectionList.includes( id )
  const { width } = dimensions

  const toggleSelection = () => {
    if( isSelected ) {
      const index = selectionList.indexOf( id )
      selectionList.splice( index, 1 )
    }
    else {
      selectionList.push( id )
    }
    setSelectionList( [ ...selectionList ] )
  }

  const openDrawing = () => {
    router.push( `/drawing/${ id }` )
  }

  return (
    <AnimatedTouchableOpacity
      style={ [ styles.item, { width, backgroundColor:colors.card, borderColor: colors.border } ] }
      onPress={ isSelectionMode ? toggleSelection : debounce( openDrawing, BUTTON_DEBOUNCE_DELAY ) }
      layout={ Layout.springify() }>
      { isSelectionMode && <ListSelectionCircle isSelected={ isSelected } colors={ colors } /> }
      <Thumbnail src={ thumbnail } size={ 24 } />
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
