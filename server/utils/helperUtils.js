import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey = process.env.MY_SECRET;

class helperUtils {
  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  }

  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload;
    } catch (error) {
      return false;
    }
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default helperUtils;
