var config = {
  development: {
      //url to be used in link generation
      url: 'http://localhost',
      //mongodb connection settings
      database: {
          host:   'localhost',
          port:   '5432',
          db:     'keepsake',
          user: 'dbadmin',
          password: 'password'
      }
  }
  };
  module.exports = config;