import ModalContainer from './ModalContainer'
import { BUTTON_DEBOUNCE_DELAY } from '@/constants'
import { debounce } from '@/utils/debounce'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useCallback } from 'react'
import { useModalHider } from '../hooks/modal_hider'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ModalProps
 * @property { ReactElement } children
 * @property { boolean } isVisible
 * @property { string } title
 * @property { string } [ acceptButtonTitle ]
 * @property { boolean } [ isButtonInactive ]
 * @property { boolean } [ hideButtons ]
 * @property { () => void } onAccept
 */

/**
 * @param { ModalProps } props
 * @returns { ReactElement }
 */
const Modal = ( props ) => {

  const {
    children, isVisible, title, acceptButtonTitle, isButtonInactive, hideButtons, onAccept,
  } = props
  const hide = useModalHider()
  const { colors } = useTheme()

  const handleAccept = useCallback( () => {
    hide()
    onAccept()
  }, [ hide, onAccept ] )

  return (
    <ModalContainer
      visible={ isVisible }
      onClose={ hide }>
      <Text style={ [ styles.title, { color:colors.text }]  }>{ title }</Text>
      { children }
      {
        !hideButtons && (
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
              onPress={ debounce( handleAccept, BUTTON_DEBOUNCE_DELAY ) }>
              <Text style={ [ styles.buttonText, { color: '#FFFFFF' } ] }>{ acceptButtonTitle ?? 'Accept' }</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </ModalContainer>
  )

}

const styles = StyleSheet.create( {

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
