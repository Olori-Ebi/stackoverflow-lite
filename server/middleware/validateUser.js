import { check, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
      status: 422,
      errors: extractedErrors,
    });
  }
  return next();
};

const userValidationRules = () => [
  check('firstname')
    .notEmpty()
    .withMessage('firstname field is required')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('firstname should be between 3 and 20 characters')
    .isAlpha()
    .withMessage('firstname should only contain alphabets'),
  check('lastname')
    .notEmpty()
    .withMessage('lastname field is required')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('lastname should be between 3 and 20 characters')
    .isAlpha()
    .withMessage('lastname should only contain alphabets'),
  check('email')
    .notEmpty()
    .withMessage('email field is required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address entered')
    .customSanitizer((email) => email.toLowerCase()),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage('Password must be between 6 to 15 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/)
    .withMessage('password must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character and must be between 6 and 15 in length'),
];
export default { validate, userValidationRules };
