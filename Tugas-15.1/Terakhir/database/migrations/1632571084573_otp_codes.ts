import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OtpCodes extends BaseSchema {
  protected tableName = 'otp_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('otp_code')
      table.timestamp('expires_at')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}