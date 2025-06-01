import AnimatedTouchableOpacity from '@/components/AnimatedTouchableOpacity'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Layout } from 'react-native-reanimated'

/**
 * @import { Drawing, SharedConfig } from '../models'
 * @import { ReactElement } from 'react'
 * @import { ThemeContext } from '@/contexts/theme'
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
    <View
      style={ [ styles.thumbnailContainer, { height:size } ] }>
      <Image src={ src } width={ 32 } height={ 32 } resizeMode="cover" />
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
 * @typedef { Object } GridDrawingItemProps
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
  const { id, thumbnail, name, lastModified } = item
  const { dimensions, colors, router } = config
  const { width, spacing } = dimensions

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
      onPress={ () => router.push( `/drawing/${ id }` ) }
      layout={ Layout.springify() }>
      <Thumbnail src={ thumbnail } size={ width } />
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
  },

  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  info: {
    padding: 10,
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

export default GridDrawingItem
