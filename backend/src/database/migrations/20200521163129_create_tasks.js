
exports.up = function(knex) {
  return knex.schema.createTable('tasks', function (table) {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('category').notNullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.datetime('initial_date')
      table.datetime('final_date')

      table.integer('user_id').notNullable()

      table.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
};
