// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'express',
      user:     'root',
      password: ''
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'express',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'express'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'express',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'express'
    }
  }

};
