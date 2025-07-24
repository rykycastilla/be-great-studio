import TouchableOpacity from '@/components/TouchableOpacity'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { useTheme } from '@/contexts/theme'
import { useViewMode } from '@/contexts/drawing_list'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const ViewModeButton = () => {

  const [ viewMode, setViewMode ] = useViewMode()
  const { colors } = useTheme()

  const toggleViewMode = () => {
    setViewMode( ( viewMode === 'grid' ) ? 'list' : 'grid' )
  }

  return (
    <TouchableOpacity
      style={ [ styles.iconButton, { backgroundColor:colors.card } ] }
      onPress={ toggleViewMode }>
      <Ionicons name={ ( viewMode === 'grid' ) ? 'list' : 'grid' } size={ 22 } color={ colors.primary } />
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
} )

export default ViewModeButton
