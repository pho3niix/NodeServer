
exports.up = async function(knex) {
  try {

    await knex.schema.createTable("asignatures",(table)=>{
      table.increments("id_asignature");
      table.string("name");
    })
    await createTable('students',(table)=>{
      table.increments("id");
      table.string("name");
      table.integer("age");
      table.integer("asignature").unsigned().notNullable();
  
      table.foreign("asignature").references("id_asignature").inTable("asignatures");
    })
  } catch (error) {
    console.log(error);
  }
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("students")
  .dropTable("asignatures")
};
