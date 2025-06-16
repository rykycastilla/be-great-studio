import { ConfigDTO } from './ConfigDTO'

export interface ConfigDAO {
  get( id:string ): Promise<ConfigDTO|null>
  save( config:ConfigDTO ): Promise<void>
  delete( id:string ): Promise<void>
  getAll(): Promise<ConfigDTO[]>
}
