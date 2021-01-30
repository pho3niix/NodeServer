// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'objection',
      user:     'root',
      password: ''
    },
    pool: {
      min: 0,
      max: 10
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'objection',
      user:     'root',
      password: ''
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'objection',
      user:     'root',
      password: ''
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
