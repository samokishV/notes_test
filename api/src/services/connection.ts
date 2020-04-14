import * as dotenv from 'dotenv';

import {
  Connection, createConnection
} from 'typeorm';
import { Notes } from '../models/Notes';

dotenv.config({ path: '.env' });

let connection: Connection | void;

export const connect = async () => {
  if (!connection) {
    connection = await createConnection({
      name: 'default',
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_NAME,
      synchronize: false,
      logging: false,
      entities: [
        Notes,
      ],
    })
      .then(result => console.log('Sucessfully connect to db'))
      .catch(err => console.log(err));
  }
  return connection;
};
