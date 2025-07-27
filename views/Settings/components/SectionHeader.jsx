import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } SectionHeaderProps
 * @property { string } children
 */

/**
 * @param { SectionHeaderProps } props
 * @returns { ReactElement }
 */
const SectionHeader = ( props ) => {
  const { children:title } = props
  const { colors } = useTheme()
  return (
    <>
      <Text adjustsFontSizeToFit style={ [ styles.sectionHeader, { color:colors.inactive } ] }>
        { title.toUpperCase() }
      </Text>
    </>
  )
}

const styles = StyleSheet.create( {
  sectionHeader: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
} )

export default SectionHeader
