import { SettingsOption } from './SettingsOption'

export interface Setting {
  target: string
  getter: string
  setter: string
  optionList: SettingsOption[]
}
