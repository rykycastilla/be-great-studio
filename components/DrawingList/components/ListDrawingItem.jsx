import AnimatedTouchableOpacity from '@/components/AnimatedTouchableOpacity'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Layout } from 'react-native-reanimated'
import { useItemDimensions } from '../hooks/item_dimensions'
import { useRouter } from 'expo-router'
import { useTheme } from '@/hooks/theme/index'

/**
 * @import { Drawing } from '../models'
 * @import { ReactElement } from 'react'
 * @import { ThemeContext } from '@/hooks/theme'
 */

/**
 * @typedef { Object } ThumbnailProps
 * @property { string } src
 * @property { number } size
 */

/**
 * @param { ThumbnailProps } props
 * @returns { ReactElement }
 */
const Thumbnail = ( props ) => {
  const { src, size } = props
  return (
    <View style={ [ styles.thumbnailContainer ] }>
      <Image src={ src } width={ size } height={ size } resizeMode="cover" />
    </View>
  )
}

/**
 * @typedef { Object } InfoProps
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
 * @typedef { Object } ListDrawingItemProps
 * @property { Drawing } item
 * @property { number } index
 */

/**
 * @param { ListDrawingItemProps } props
 * @returns { ReactElement }
 */
const ListDrawingItem = ( props ) => {

  const { item } = props
  const { id, name, thumbnail, lastModified } = item
  const { colors } = useTheme()
  const { width } = useItemDimensions( 'list' )
  const router = useRouter()

  return (
    <AnimatedTouchableOpacity
      style={ [ styles.item, { width, backgroundColor:colors.card, borderColor: colors.border } ] }
      onPress={ () => ( router.push( `/drawing/${ id }` ) ) }
      layout={ Layout.springify() }>
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

} )

export default ListDrawingItem
