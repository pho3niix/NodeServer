
exports.up = async function(knex) {
    try {
        await knex.schema.createTable("inventory",(table)=>{
            table.increments("id").primary();
            table.string("name");
            table.integer("quantity");
            table.integer("price");
        })
    } catch (error) {
        console.log(error);
    }
};

exports.down = async function(knex) {
  try {
      await knex.schema.dropTableIfExist("inventory");
  } catch (error) {
      console.log(error);
  }
};
