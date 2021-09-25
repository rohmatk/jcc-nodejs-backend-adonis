import { DateTime } from 'luxon'
import {BaseModel, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

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