import { check, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({
      status: 400,
      errors: extractedErrors,
    });
  }
  return next();
};

const questionValidationRules = () => [
  check('title')
    .notEmpty()
    .withMessage('title field is required'),
  check('body')
    .notEmpty()
    .withMessage('body field is required'),
];

export default { validate, questionValidationRules };
