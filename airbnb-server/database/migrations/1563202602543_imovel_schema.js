'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImovelSchema extends Schema {
  up () {
    this.create('imovels', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('imovels')
  }
}

module.exports = ImovelSchema
