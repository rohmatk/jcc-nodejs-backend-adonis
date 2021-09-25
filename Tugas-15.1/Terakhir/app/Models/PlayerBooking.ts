import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PlayerBooking extends BaseModel {
  @column()
  public userId: string

  @column()
  public bookingId: number

}