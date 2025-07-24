import Switch from '@/components/Switch'
import TouchableOpacity from '@/components/TouchableOpacity'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } NavigationItemProps
 * @property { string } label
 * @property { boolean } isActive
 * @property { ( isActive:boolean ) => void } onIsActiveChange
 */

/**
 * @param { NavigationItemProps } props
 * @returns { ReactElement }
 */
const NavigationItem = ( props ) => {
  const { label, isActive, onIsActiveChange:setIsActive } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      style={ [ styles.settingItem, { backgroundColor:colors.card, borderColor:colors.border } ] }
      onPress={ () => setIsActive( !isActive ) }
      activeOpacity={ 0.7 }>
      <Text style={ [ styles.settingLabel, { color:colors.text } ] }>{ label }</Text>
      <View style={ styles.switchContainer }>
        <Switch isActive={ isActive } onIsActiveChange={ setIsActive } />
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

} )

export default NavigationItem
