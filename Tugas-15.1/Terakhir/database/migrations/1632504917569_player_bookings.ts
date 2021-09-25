import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PlayerBookings extends BaseSchema {
  protected tableName = 'player_bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('booking_id').unsigned().references('id').inTable('bookings').onDelete('CASCADE').onUpdate('CASCADE');
      table.uuid('player_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}