import * as FileSystem from 'expo-file-system'
import Ionicons from '@/components/Ionicons'
import TouchableOpacity from '@/components/TouchableOpacity'
import { IdService } from '@/modules/id/controllers'
import { getDocumentAsync } from 'expo-document-picker'
import { StyleSheet } from 'react-native'
import { useCallback, useState } from 'react'
import { useDrawingList } from '@/contexts/drawing_list'
import { useLoader } from '@/contexts/loader'
import { useLongCallback } from '@/hooks/long_callback'
import { useRouter } from '@/contexts/debounced_router'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ExpoIcon } from '@/types/ExpoIcon'
 * @import { ReactElement } from 'react'
 */

const BASE64_PREFIX = 'data:image/bgpx;base64,'

/**
 * @returns { () => Promise<void> }
 */
function useBgpxPicker() {
  const { importDrawing } = useDrawingList()
  return useCallback( async() => {
    const { assets } = await getDocumentAsync( { multiple:true } )
    if( assets === null ) { return }
    for( const bgpxFile of assets ) {
      const { name, uri } = bgpxFile
      if( !name.endsWith( '.bgpx' ) ) { continue }
      const base64 = await FileSystem.readAsStringAsync(
        uri, { encoding:FileSystem.EncodingType.Base64 },
      )
      await importDrawing( BASE64_PREFIX + base64 )
    }
  }, [ importDrawing ] )
}

/**
 * @typedef { object } AddState
 * @property { ExpoIcon } icon
 * @property { () => void } handle
 */

/**
 * @returns { [ AddState, () => void ] }
 */
function useAddButtonToggle() {

  const [ isImporting, setIsImporting ] = useState( false )
  const router = useRouter()
  const importIt = useBgpxPicker()
  const addTask = useLoader()

  const toggleState = useLongCallback( () => {
    setIsImporting( ( isImporting ) => !isImporting )
  } )

  const handleCreation = useCallback( () => {
    const id = IdService.create()
    router.push( `/drawing/${ id }` )
  }, [ router ] )

  const handleImporting = useCallback( () => {
    const importingDrawing = importIt()
    addTask( importingDrawing )
  }, [ importIt, addTask ] )

  /** @type { AddState } */ const creation = {
    icon:'add', handle:handleCreation,
  }

  /** @type { AddState } */ const importing = {
    icon:'download', handle:handleImporting,
  }

  return [ isImporting ? importing : creation, toggleState ]

}

/**
 * @returns { ReactElement }
 */
const AddPictureButton = () => {

  const { colors } = useTheme()
  const [ state, toggleState ] = useAddButtonToggle()
  const { icon, handle } = state

  return (
    <TouchableOpacity
      style={ [ styles.addPictureButton, { backgroundColor:colors.primary } ] }
      onPress={ handle }
      onLongPress={ toggleState }>
      <Ionicons name={ icon } size={ 28 } color="#FFFFFF" />
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
