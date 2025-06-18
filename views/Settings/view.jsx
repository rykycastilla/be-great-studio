import AreaView from '@/components/AreaView'
import BackButton from '@/components/BackButton'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
export default function Settings() {
  const { colors } = useTheme()
  return (
    <AreaView style={ styles.container }>
      <View style={ styles.header }>
        <BackButton />
        <Text style={ [ styles.title, { color:colors.text } ] }>Settings</Text>
        <View style={ styles.placeholder } />
      </View>
    </AreaView>
  )
}

const styles = StyleSheet.create( {

  safeArea: {
    backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },

  placeholder: {
    width: 40,
  },

} )
