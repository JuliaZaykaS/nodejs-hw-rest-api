const Joi = require('joi')
// const { ValidationError } = require('../helpers/errors')

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

const checkContactValidation = (req, res, next) => {
//   const re = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/
//   const re = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
  const re = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ -]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    phone: Joi.string()
    //   .pattern(new RegExp(re))
      .pattern(new RegExp(re))
    //   .pattern(new RegExp(/^((8|+7)[- ]?)?((?d{3})?[- ]?)?[d- ]{7,10}$/))
    //   .pattern(new RegExp(String.raw(/^((8|+7)[- ]?)?((?d{3})?[- ]?)?[d- ]{7,10}$/)))
    //   .pattern(new RegExp(String.raw(/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/)))
    //   .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    //   .pattern(new RegExp(String.raw(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)))
      .required(),

  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details)))
  }
  next()
}

module.exports = checkContactValidation
