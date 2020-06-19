import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const currentEnv = process.env.NODE_ENV || 'dev';

const config = {
  dev: process.env.devDB,
  test: process.env.testDB,
  production: process.env.DATABASE_URL,
};

const pool = new Pool({
  connectionString: config[currentEnv],
});

pool
  .connect()
  .then(() => console.log(`connected to ${currentEnv} DB`))
  .catch((err) => console.log(err));

export default pool;
