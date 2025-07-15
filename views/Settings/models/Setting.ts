import { SettingsOption } from './SettingsOption'

export interface Setting {
  target: string
  title: string
  getter: string
  setter: string
  optionList: SettingsOption[]
}
