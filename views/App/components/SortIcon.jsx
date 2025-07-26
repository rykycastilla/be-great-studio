import Ionicons from '@/components/Ionicons'
import { SortCategory } from '@/contexts/drawing_list'
import { StyleSheet, View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 * @import { Sort } from '@/contexts/drawing_list'
 */

/**
 * @typedef { object } SortIconProps
 * @property { Sort } sort
 * @property { number } size
 * @property { string } color
 */

/**
 * @param { SortIconProps } props
 * @returns { ReactElement }
 */
const SortIcon = ( props ) => {
  const { sort, size, color } = props
  const { category, ascending } = sort
  const arrowSize = Math.round( size / 15 * 11 )
  const width = size + arrowSize
  const height = width
  return (
    <View style={ [ styles.sortIcon, { width, height } ] }>
      <Ionicons
        name={ category === SortCategory.ALPHABETICAL ? 'text-outline' : 'time-outline' }
        size={ size }
        color={ color } />
      <Ionicons
        name={ ascending ? 'arrow-up-sharp' : 'arrow-down-sharp' }
        size={ arrowSize }
        color={ color } />
    </View>
  )
}

const styles = StyleSheet.create( {
  sortIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default SortIcon
