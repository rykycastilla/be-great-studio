import AnimatedModal from './AnimatedModal'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useCallback } from 'react'
import { useModalHider } from '../hooks/modal_hider'
import { useTheme } from '@/hooks/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { Object } ModalProps
 * @property { ReactElement } children
 * @property { boolean } isVisible
 * @property { string } title
 * @property { string } [ acceptButtonTitle ]
 * @property { boolean } [ isButtonInactive ]
 * @property { () => void } [ onAccept ]
 */

/**
 * @param { ModalProps } props
 * @returns { ReactElement }
 */
const Modal = ( props ) => {

  const { children, isVisible, title, acceptButtonTitle, isButtonInactive, onAccept } = props
  const hide = useModalHider()
  const { colors } = useTheme()

  const handleAccept = useCallback( () => {
    hide()
    if( onAccept !== undefined ) { onAccept() }
  }, [ hide, onAccept ] )

  return (
    <AnimatedModal
      visible={ isVisible }
      onClose={ hide }>
      <View style={ [ styles.content, { backgroundColor:colors.card } ] }>
        <Text style={ [ styles.title, { color:colors.text }]  }>{ title }</Text>
        { children }
        <View style={ styles.buttons }>
          <TouchableOpacity
            style={ [ styles.button, { backgroundColor:colors.background } ] }
            onPress={ hide }>
            <Text style={ [ styles.buttonText, { color:colors.primary } ] }>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={ isButtonInactive }
            style={
              [
                styles.button,
                { backgroundColor:( isButtonInactive ? colors.inactive : colors.primary ) },
              ]
            }
            onPress={ handleAccept }>
            <Text style={ [ styles.buttonText, { color: '#FFFFFF' } ] }>{ acceptButtonTitle ?? 'Accept' }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedModal>
  )

}

const styles = StyleSheet.create( {

  content: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

} )

export default Modal
