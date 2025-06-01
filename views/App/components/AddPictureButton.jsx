import { createToken } from 'create-token'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'
import { useTheme } from '@/contexts/theme/index'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const AddPictureButton = () => {

  const { colors } = useTheme()
  const router = useRouter()

  const handlePress = useCallback( () => {
    const id = createToken( 15 )
    router.push( `/drawing/${ id }` )
  }, [ router ] )

  return (
    <TouchableOpacity
      style={ [ styles.addPictureButton, { backgroundColor:colors.primary } ] }
      onPress={ handlePress }>
      <Ionicons name="add" size={ 28 } color="#FFFFFF" />
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create( {
  addPictureButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
} )

export default AddPictureButton
