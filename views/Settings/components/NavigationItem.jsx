import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } NavigationItemProps
 * @property { string } target
 * @property { string } label
 * @property { string } [ value ]
 * @property { boolean } [ disabled ]
 */

/**
 * @param { NavigationItemProps } props
 * @returns { ReactElement }
 */
const NavigationItem = ( props ) => {
  const { target, label, value, disabled } = props
  const { colors } = useTheme()
  const router = useRouter()
  return (
    <TouchableOpacity
      style={ [ styles.settingItem, { backgroundColor:colors.card, borderColor:colors.border } ] }
      onPress={ () => router.push( `/settings/${ target }` ) }
      disabled={ disabled }
      activeOpacity={ 0.7 }>
      <Text style={ [ styles.settingLabel, { color:( disabled ? colors.inactive : colors.text ) } ] }>{ label }</Text>
      <View style={ styles.valueContainer }>
        <Text style={ [ styles.valueText, { color:colors.inactive } ] }>{ value }</Text>
        { !disabled && <Ionicons name="chevron-forward" size={ 20 } color={ colors.inactive } /> }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
  },

  settingLabel: {
    fontSize: 16,
    fontWeight: '400',
  },

  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  valueText: {
    fontSize: 16,
    marginRight: 4,
  },

} )

export default NavigationItem
