import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fields extends BaseSchema {
  protected tableName = 'fields'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name');
      table.enum('type', ['futsal', 'minisoccer', 'basketball', 'soccer', 'volleyball']);
      table.integer('venue_id').unsigned().references('id').inTable('venues').onDelete('cascade').onUpdate('cascade');
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
