import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Venues extends BaseSchema {
  protected tableName = 'venues'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.uuid('user_id').after('id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign(['user_id']);
      table.dropColumn('user_id');
    })
  }
}