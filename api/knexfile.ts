require('dotenv').config({ path: '.env'});

module.exports = {
  client: 'mysql',
  connection: {
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
  },
  migrations: {
    directory: `./migrations`,
  },
  seeds: {
    directory: `./seeds`,
  },
};
