import Input from '@/components/Input'
import { useDrawingList } from '@/contexts/drawing_list'
import { useModalAction, useModalConfig } from '@/contexts/modal'
import { useState } from 'react'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ReanmingModalProps
 * @property { [ drawingList:Drawing[] ] } args
 */

/**
 * @param { ReanmingModalProps } props
 * @returns { ReactElement }
 */
const RenamingModal = ( props ) => {

  const { args } = props
  const [ drawingList ] = args
  const [ drawing ] = /** @type { [ Drawing ] } */ ( drawingList )
  const [ name, setName ] = useState( '' )
  const { updateDrawing } = useDrawingList()
  useModalConfig( { title:'Change name' } )

  useModalAction( () => {
    updateDrawing( drawing, { name } )
  } )

  return <Input defaultValue={ drawing.name } setValue={ setName } />

}

export default RenamingModal
