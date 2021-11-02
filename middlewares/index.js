const {
  checkContactValidation,
  checkContactFavoriteValidation,
} = require('./contactValidation')
const { errorHandler } = require('./errorHandler')
const tokenValidation = require('./tokenValidation')
const { checkUserValidation } = require('./userValidation')

module.exports = {
  checkContactValidation,
  checkContactFavoriteValidation,
  errorHandler,
  tokenValidation,
  checkUserValidation,
}
