import { Layout } from '../hooks/item_dimensions'
import { Router } from 'expo-router'
import { ThemeContext } from '@/contexts/theme'

export interface SharedConfig {
  dimensions: Layout
  colors: ThemeContext[ 'colors' ]
  router: Router
}
