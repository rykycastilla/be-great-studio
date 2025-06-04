import { Layout } from '../hooks/item_dimensions'
import { Router } from 'expo-router'
import { ThemeContext } from '@/contexts/theme'

export interface SharedConfig {
  dimensions: Layout
  colors: ThemeContext[ 'colors' ]
  router: Router
  isSelectionMode: boolean
  addItem( id:string ): void
  checkItemIncluded( id:string ): boolean
  deleteItem( id:string ): void
}
