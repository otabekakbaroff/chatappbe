exports.up = function(knex) {
    return knex.schema.createTable('user', table => {

        table.increments();
        
        table.string('name', 255).notNullable().index();

        table
          .string('username', 255)
          .notNullable()
          .unique();
      
        table.string('password', 255).notNullable();

      });
    };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};
