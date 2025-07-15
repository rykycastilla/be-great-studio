import { Group } from './Group'

export interface InternalGroup extends Group {
  getData(): Promise<string>
}
