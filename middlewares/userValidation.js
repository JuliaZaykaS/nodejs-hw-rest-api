const Joi = require('joi')
const { emailValidation, passwordValidation } = require('../helpers')
const { ValidationError } = require('../helpers')

const checkUserValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email(emailValidation)
      .required(),

    password: Joi.string()
      .pattern(passwordValidation)
      .required(),

  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details[0].message)))
  }
  next()
}

module.exports = {
  checkUserValidation,
}
