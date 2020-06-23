import pool from '../database/poolConn';

class questions {
  static postQuestion(req, res) {
    const { email } = req.user;
    const { title, body } = req.body;
    const createdon = new Date();

    try {
      const query = 'INSERT INTO questions(email, title, body, createdon) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [email, title, body, createdon];
      pool.query(query, values, (err, result) => {
        if (err) console.log(err);
        return res.status(201).json({
          status: 201,
          data: result.rows[0],
          message: 'Question asked successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default questions;
