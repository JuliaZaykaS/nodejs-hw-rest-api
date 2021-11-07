const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'tmp')
// console.log(tempDir)
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    // const [filename, extension] = file.originalname.split('.')
    cb(null, file.originalname)
    // cb(null, ` ${file.originalname}.${extension}`)
  },
  limits: {
    fileSize: 1048576,
  }

})

const uploadAvatar = multer({
  storage: multerConfig
})

module.exports = {
  uploadAvatar
}
