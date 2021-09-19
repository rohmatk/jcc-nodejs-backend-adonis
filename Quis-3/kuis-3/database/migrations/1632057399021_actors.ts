import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Actors extends BaseSchema {
  protected tableName = 'actors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('bio')
      table.dateTime('date_of_birth')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
