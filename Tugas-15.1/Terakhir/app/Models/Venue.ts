import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column, 
  hasMany, 
  hasManyThrough,
  HasMany,
  HasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import Field from "App/Models/Field"
import Booking from "App/Models/Booking"

/**
 *  @swagger
 *  definitions:
 *    Venue:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        user_id:
 *          type: string
 *        name:
 *          type: string
 *        address:
 *          type: string
 *        phone:
 *          type: string
 *      required:
 *        - name
 *        - address
 *        - phone
 */

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public phone: string

  @column.dateTime({
    autoCreate: true,
    serialize: value  => value.toFormat('dd LLL yyyy HH:mm:ss')
  })
  public createdAt: DateTime
  
  @column.dateTime({
    autoCreate: true,
    autoUpdate: true ,
    serialize: value  => value.toFormat('dd LLL yyyy HH:mm:ss')
  })
  public updatedAt: DateTime
  public static settings = {
    loadApp: true
  }
  
  @hasMany(() => Field)
  public fields: HasMany<typeof Field>

  @hasManyThrough([() => Booking, () => Field])
  public bookings: HasManyThrough<typeof Booking>
}