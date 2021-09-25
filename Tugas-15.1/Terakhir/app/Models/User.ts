import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel, beforeCreate, manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { uuid } from 'uuidv4';
import Booking from "App/Models/Booking";
import type {ManyToMany} from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public full_name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async assignUuid (user: User) {
    user.id = uuid();
  }

  @manyToMany(() => Booking, {
    pivotTable: 'player_bookings',
    localKey: 'id',
    pivotForeignKey: 'player_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'booking_id'
  })
  public bookings: ManyToMany<typeof Booking>
}