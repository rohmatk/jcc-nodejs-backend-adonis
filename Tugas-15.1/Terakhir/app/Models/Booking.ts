import { DateTime } from 'luxon'
import {BaseModel, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User"

/**
 *  @swagger
 *  definitions:
 *    Booking:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        field_id:
 *          type: number
 *        user_id:
 *          type: string
 *        play_date_start:
 *          type: datetime
 *        play_date_finish:
 *          type: datetime
 *      required:
 *        - field_id
 *        - play_date_start
 *        - play_date_finish
 */

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    columnName: 'field_id'
  })
  public fieldId: number

  @column({
    columnName: 'user_id'
  })
  public userId: string

  @column.dateTime({
    columnName: 'play_date_start'
  })
  public playDateStart: DateTime
  
  @column.dateTime({
    columnName: 'play_date_finish'
  })
  public playDateFinish: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @manyToMany(() => User, {
    pivotTable: 'player_bookings',
    localKey: 'id',
    pivotForeignKey: 'booking_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id'
  })
  public players: ManyToMany<typeof User>
}