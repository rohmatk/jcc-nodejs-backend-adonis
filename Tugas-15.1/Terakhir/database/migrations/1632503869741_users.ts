import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.string('full_name').notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 180).notNullable();
      table.string('phone').notNullable();
      table.string('remember_me_token').nullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}