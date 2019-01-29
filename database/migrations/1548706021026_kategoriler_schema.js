'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KategorilerSchema extends Schema {
  up () {
    this.create('kategorilers', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('kategorilers')
  }
}

module.exports = KategorilerSchema
