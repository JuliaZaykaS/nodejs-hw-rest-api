const Joi = require('joi')
const { nameValidation, phoneValidation, emailValidation } = require('../helpers/validations-constants')
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

const checkContactValidation = (req, res, next) => {
  // const re = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ -]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/

  const schema = Joi.object({
    // name: Joi.string().alphanum().min(3).max(30).allow('').required(),
    // name: Joi.string().alpha().min(3).max(30).allow('').required(),
    // name: Joi.string().min(3).max(30).required().pattern(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/),
    // name: Joi.string().min(3).max(30).required().pattern(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/),
    name: Joi.string().min(3).max(30).required().pattern(nameValidation),

    email: Joi.string()
      // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .email(emailValidation)
      .required(),

    phone: Joi.string()
      // .pattern(new RegExp(re))
      .pattern(phoneValidation)
      // .pattern(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ -]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
      .required(),

    favorite: Joi.boolean()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details[0].message)))
  }
  next()
}

module.exports = checkContactValidation
