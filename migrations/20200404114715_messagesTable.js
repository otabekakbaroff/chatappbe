exports.up = function(knex) {
    return knex.schema.createTable('message', table => {

        table.increments();
        table.integer('dateDiggits',126);
        table.string('dateString',126).index();

        table.string('message',500).notNullable();

        table
        .integer("sender_id") 
        .unsigned() 
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE") 
        .onDelete("CASCADE");

        table
        .integer("receiver_id") 
        .unsigned() 
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE") 
        .onDelete("CASCADE");
       
      });
    };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('message');
};
