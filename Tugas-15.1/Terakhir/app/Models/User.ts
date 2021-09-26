import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel, 
  beforeCreate, 
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { uuid } from 'uuidv4'
import Booking from "App/Models/Booking"

/**
 *  @swagger
 *  definitions:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        full_name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        role:
 *          type: string
 *        phone:
 *          type: string
 *      required:
 *        - full_name
 *        - email
 *        - password
 *        - role
 *        - phone
 */

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public fullName: string
  
  @column()
  public email: string
  
  @column({ serializeAs: null })
  public password: string
  
  @column()
  public role: string
  
  @column.dateTime()
  public verifiedAt: DateTime
  
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
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'booking_id'
  })
  public bookings: ManyToMany<typeof Booking>
}