const userTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    createdon  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(100) NOT NULL,
    UNIQUE (email)
);`;

const questionTable = `
  CREATE TABLE IF NOT EXISTS questions(
    questionId SERIAL PRIMARY KEY,
    email VARCHAR(255) REFERENCES users(email),
    title VARCHAR(100),
    body VARCHAR(255),
    createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email)
);`;

const answerTable = `
  CREATE TABLE IF NOT EXISTS answers(
  questionId SERIAL PRIMARY KEY,
  answerId INTEGER NOT NULL,
  email VARCHAR(100) NOT NULL,
  body VARCHAR(255),
  createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const createTables = `${userTable}${questionTable}${answerTable}`;

export default createTables;
