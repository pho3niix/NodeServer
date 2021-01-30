
exports.seed = async function(knex) {
    try {
      await knex("inventory").del();

      await knex("inventory").insert([
        {id:1,name:"manzana",quantity:20,price:15},
        {id:2,name:"pera",quantity:25,price:10},
        {id:3,name:"platano",quantity:30,price:18},
        {id:4,name:"uva",quantity:50,price:12},
        {id:5,name:"naranja",quantity:15,price:22}
      ])
    } catch (error) {
      console.log(error);
    }
};
