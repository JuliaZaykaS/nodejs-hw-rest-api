const {
  checkContactValidation,
  checkContactFavoriteValidation,
} = require('./contactValidation')
const { errorHandler } = require('./errorHandler')
const tokenValidation = require('./tokenValidation')
const { checkUserValidation, checkUserEmailValidation } = require('./userValidation')
const { uploadAvatar } = require('./multer')

module.exports = {
  checkContactValidation,
  checkContactFavoriteValidation,
  errorHandler,
  tokenValidation,
  checkUserValidation,
  checkUserEmailValidation,
  uploadAvatar,
}
