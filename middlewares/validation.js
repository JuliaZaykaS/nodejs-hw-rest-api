const Joi = require('joi')
const { nameValidation, phoneValidation, emailValidation } = require('../helpers/validations-constants')
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

const checkContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().pattern(nameValidation),

    email: Joi.string()
      .email(emailValidation)
      .required(),

    phone: Joi.string()
      .pattern(phoneValidation)
      .required(),

    favorite: Joi.boolean()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details[0].message)))
  }
  next()
}

const checkContactFavoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details[0].message)))
  }
  next()
}

module.exports = {
  checkContactValidation,
  checkContactFavoriteValidation,
}
