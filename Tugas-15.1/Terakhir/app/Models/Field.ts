import { DateTime } from 'luxon'
import {
  BaseModel, 
  belongsTo, 
  column, 
  hasMany, 
  BelongsTo, 
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import { TypeField } from "Contracts/TypeField"
import Venue from "App/Models/Venue"
import Booking from "App/Models/Booking"

export default class Field extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: TypeField
  
  @column()
  public venueId: number
  
  @column.dateTime({
    autoCreate: true,
    serialize: value  => value.toFormat('dd LLL yyyy HH:mm:ss')
  })
  public createdAt: DateTime
  
  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: value  => value.toFormat('dd LLL yyyy HH:mm:ss')
  })
  public updatedAt: DateTime

  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>

  @hasMany(() => Booking)
  public bookings: HasMany<typeof Booking>
}