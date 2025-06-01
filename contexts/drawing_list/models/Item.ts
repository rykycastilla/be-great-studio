import { Drawing } from './Drawing'
import { ReactElement } from 'react'

export interface Item {
  ( props:ItemProps ): ReactElement
}

interface ItemProps {
  item: Drawing
  index: number
}
