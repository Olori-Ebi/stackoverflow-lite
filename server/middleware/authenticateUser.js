import HelperUtils from '../utils/helperUtils';

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */

class AuthenticateUser {
  /**
   * @method verifyAuthHeader
   * @description
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns
   */
  static verifyAuthHeader(req) {
    const token = req.headers.authorization;
    const payload = HelperUtils.verifyToken(token);
    if (!token) {
      return { error: 'auth error' };
    }
    if (!payload) {
      return { error: 'payload error' };
    }

    return payload;
  }

  static verifyUser(req, res, next) {
    const payload = AuthenticateUser.verifyAuthHeader(req);

    if (payload && payload.error === 'auth error') {
      return res.status(401).json({
        status: 401,
        error: 'No authorization header was specified',
      });
    }
    if (payload && payload.error === 'payload error') {
      return res.status(401).json({
        status: 401,
        error: 'Provided token cannot be authenticated',
      });
    }
    req.user = payload;
    next();
  }
}

export default AuthenticateUser;
