
exports.seed = async function(knex) {
  try {
    await knex("students").del();
    await knex("asignatures").del();
    
    await knex("asignatures").insert([
      {id_asignature:1,name:"informatica"},
      {id_asignature:2,name:"redes"},
      {id_asignature:3,name:"base de datos"},
    ])
    
    await knex("students").insert([
      {id: 1, name: 'Hugo',age:24,asignature:2},
      {id: 2, name: 'Alexandra',age:24,asignature:3},
      {id: 3, name: 'Carlos',age:21,asignature:1},
    ]);

  } catch (error) {
    console.log(error);  
  }
};