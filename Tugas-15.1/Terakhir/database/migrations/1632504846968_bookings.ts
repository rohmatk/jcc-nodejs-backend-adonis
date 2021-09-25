import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('field_id').unsigned().references('id').inTable('fields').onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamp('play_date_start').nullable();
      table.timestamp('play_date_finish').nullable();
      table.uuid('booking_user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}