const dropUserTable = 'DROP TABLE IF EXISTS users CASCADE;';
const dropQuestionsTable = 'DROP TABLE IF EXISTS questions CASCADE;';
const dropAnswersTable = 'DROP TABLE IF EXISTS answers CASCADE;';

const dropTable = `${dropUserTable}${dropQuestionsTable}${dropAnswersTable}`;

export default dropTable;
