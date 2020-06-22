import helperUtils from '../utils/helperUtils';
import pool from '../database/poolConn';

class UserController {
  /**
   * @method createUser
   * @description Registers a user if details are valid
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {void}
   */
  static createUser(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;

    const hashedPassword = helperUtils.hashPassword(password);

    const query = 'INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING firstname, lastname, email, password';
    const values = [firstname, lastname, email, hashedPassword];

    try {
      pool.query(query, values, (err, result) => {
        if (err) {
          if (err.routine === '_bt_check_unique') {
            return res.status(409).json({
              status: 409,
              message: 'User with email exists',
            });
          }
          return res.status(500).json({
            status: 500,
            message: 'An internal error occured in the server',
          });
        }
        const token = helperUtils.generateToken(result.rows[0]);
        const { rows } = result;
        return res.status(201).json({
          status: 201,
          data: { token, ...rows[0] },
          message: 'Registration successful',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static login(req, res) {
    const { email } = req.body;
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    try {
      pool.query(query, (err, result) => {
        if (err) console.log(err);
        if (!result.rows[0]) {
          return res.status(400).json({
            status: 400,
            message: 'Please enter a valid email or password',
          });
        }
        if (!helperUtils.comparePassword(req.body.password, result.rows[0].password)) {
          return res.status(400).json({
            status: 400,
            message: 'Please enter a valid email or password',
          });
        }
        const token = helperUtils.generateToken(result.rows[0]);
        const { rows } = result;
        return res.status(200).json({
          status: 200,
          data: { token, ...rows[0] },
          message: 'Login successful',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
