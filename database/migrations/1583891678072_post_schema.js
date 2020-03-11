'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('slug') // slug para identificar o post
      table.string('titulo') //Titulo do post
      table.text('descricao') // descricao do post
      table.string('file') // link dos arquivos do post (PDF - IMAGE - DOCS)
      table.string('status') // Rascunho - Publicado - Pendente de Revisão
      table.string('bones')
      table.string('snaps')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
