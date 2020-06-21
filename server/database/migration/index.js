import pool from '../poolConn';
import dropTable from './dropTable';
import createTables from './createTable';

const queryTable = () => {
  const queryText = `${dropTable}${createTables}`;
  pool.query(queryText)
    .then(() => console.log('table created successfully'))
    .catch((err) => {
      throw err;
    });
};

queryTable();
