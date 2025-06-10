import { Ionicons } from '@expo/vector-icons'
import { ComponentProps } from 'react'

type IoniconsProps = ComponentProps<typeof Ionicons>

export type ExpoIcon = IoniconsProps[ 'name' ]
