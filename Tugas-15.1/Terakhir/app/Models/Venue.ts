import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public phone:string

  @column.dateTime({ 
    autoCreate: true,
    serialize: value => value.toFormat('dd LLL yyyy HH:mm:ss')
  })
  public createdAt: DateTime

  @column.dateTime({ 
    autoCreate: true, 
    autoUpdate: true,
    serialize: value => value.toFormat('dd LLL yyyy HH:mm:ss')
  })
  public updatedAt: DateTime
}
