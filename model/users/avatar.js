const path = require('path')
const fs = require('fs').promises

const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers')

const avatarDir = path.join(__dirname, '../../', '/public/avatars') // storeImage
// const avatarDir = path.join(process.cwd(), '/avatars') // storeImage

const avatar = async (user, file) => {
  const { path: tempPath, originalname } = file
  const { _id } = user
  console.log(tempPath)
  // const avatarDir = path.join(__dirname, '../../', '/public/avatars', String(_id))
  // console.log(avatarDir)

  if (!user) {
    throw new AuthorizationError('Not authorized')
  }
  //   const createFolderIsNotExist = async (folder) => {
  //   if (!(await isAccessible(folder))) {
  //     await fs.mkdir(folder)
  //   }
  // }

  const userDir = path.join(avatarDir, String(_id))
  console.log('userdir', userDir)
  try {
    const isAccessibleDir = await fs.access(userDir)
    console.log('isAccessibleDir', isAccessibleDir)
    if (!isAccessibleDir) {
      // await fs.unlink(userDir)
      // await fs.rmdir(userDir)
      const filesInDir = await fs.readdir(userDir)
      console.log(filesInDir[0])
      const deletedFile = path.join(userDir, '/', filesInDir[0])
      console.log('deleted', deletedFile)
      // await fs.unlink(`${userDir}`)
      await fs.unlink(deletedFile)

      console.log('filesInDir', filesInDir)
      // return
    }
  } catch (error) {
    await fs.mkdir(userDir)
  }
  // const isAccessibleDir = await fs.access(userDir)
  // console.log('accessible', isAccessibleDir)
  // if (!isAccessibleDir) {
  // if (!await fs.access(userDir)) {
  // if (!(await fs.access(userDir))) {
  // await fs.mkdir(userDir)
  // }

  // const userDir = path.join(avatarDir, String(_id))

  // const fileName = path.join(avatarDir, originalname)
  // const fileName = path.join(userDir, originalname)
  // const dir = await fs.mkdir(userDir)
  // await fs.mkdir(userDir)
  // const fileName = path.join(avatarDir, String(_id), originalname)
  const fileName = path.join(userDir, originalname)
  // console.log(fileName)
  // try {
  await fs.rename(tempPath, fileName)
  // } catch (err) {
  //   await fs.unlink(tempPath)
  //   console.log(err)
  // }

  // получаем ссылку на папку с аватарками, которые будем раздавать из статики, не из базы
  // const avatarDir = path.join(__dirname, '../../', '/public/avatars')
  // console.log(123)
  // console.log(__dirname)
  // console.log(avatarDir)
  // const foundUser = await User.findById(user._id)
  // создаем путь, по которому будем сохранять аватарку конкретного пользователя
  // const dirPath = path.join(avatarDir, _id, originalname)
  // console.log(originalname)
  // const dirPath = path.join(avatarDir, String(_id), originalname)
  // const dirPath = path.join(avatarDir, String(_id))
  // const dirPath = path.join(avatarDir, originalname)
  // const dirPath = path.join(avatarDir, String(_id))
  // console.log('dirpath', dirPath)
  // console.log('type dirpath', typeof dirPath)
  // const dirPath = path.join(avatarDir, user._id, file.originalname)
  // создаем папку для аватарки пользователя
  // const uploadDir = await fs.mkdir(dirPath)
  // const uploadDir = await fs.mkdir(dirPath)
  // const uploadDir = await fs.mkdir(String(dirPath))
  // await fs.mkdir(String(dirPath))
  // await fs.mkdir(dirPath)
  // const uploadDir = ''
  // console.log('uploaddir', uploadDir)
  // try {

  // } catch (error) {

  // }
  // перемещаем аватарку из временной папки в папку пользователя
  // await fs.rename(String(tempPath), String(uploadDir))
  // console.log(typeof tempPath)
  // console.log(typeof uploadDir)
  // await fs.rename(tempPath, uploadDir)
  // await fs.rename(tempPath, dirPath)
  // await fs.rename(file.path, uploadDir)
  // const avatar = uploadDir
  // const avatarURL = `/public/avatars/${_id}/${originalname}`
  const avatarURL = `/avatars/${_id}/${originalname}`
  // const avatarURL = `/public/avatars/${user._id}/${file.originalname}`
  // const updatedUser = await User.findOneAndUpdate(_id, { avatarURL: avatarURL })
  const updatedUser = await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
  // const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
  // await User.findOneAndUpdate(user._id, { avatarURL })
  // if (!avatarURL) {
  // await fs.unlink(tempPath)
  // // await fs.unlink(file.path)
  // throw Error
  // }
  // return avatarURL
  // return updatedUser

  // const updateAvatar

  // const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { subscription: body.subscription } }, { new: true, runValidators: true })
  return updatedUser
}
// avatar()
// const avatar = async (user, file) => {
//   const { path: tempPath, originalname } = file
//   const { _id } = user
//   // console.log(_id)
//   console.log(tempPath)

//   if (!user) {
//     throw new AuthorizationError('Not authorized')
//   }
//   // получаем ссылку на папку с аватарками, которые будем раздавать из статики, не из базы
//   // const avatarDir = path.join(__dirname, '../../', '/public/avatars')
//   // console.log(123)
//   // console.log(__dirname)
//   console.log(avatarDir)
//   // const foundUser = await User.findById(user._id)
//   // создаем путь, по которому будем сохранять аватарку конкретного пользователя
//   // const dirPath = path.join(avatarDir, _id, originalname)
//   console.log(originalname)
//   const dirPath = path.join(avatarDir, String(_id), originalname)
//   // const dirPath = path.join(avatarDir, String(_id))
//   // const dirPath = path.join(avatarDir, originalname)
//   // const dirPath = path.join(avatarDir, String(_id))
//   // console.log('dirpath', dirPath)
//   // console.log('type dirpath', typeof dirPath)
//   // const dirPath = path.join(avatarDir, user._id, file.originalname)
//   // создаем папку для аватарки пользователя
//   // const uploadDir = await fs.mkdir(dirPath)
//   // const uploadDir = await fs.mkdir(dirPath)
//   // const uploadDir = await fs.mkdir(String(dirPath))
//   // await fs.mkdir(String(dirPath))
//   // await fs.mkdir(dirPath)
//   // const uploadDir = ''
//   // console.log('uploaddir', uploadDir)
//   // try {

//   // } catch (error) {

//   // }
//   // перемещаем аватарку из временной папки в папку пользователя
//   // await fs.rename(String(tempPath), String(uploadDir))
//   console.log(typeof tempPath)
//   // console.log(typeof uploadDir)
//   // await fs.rename(tempPath, uploadDir)
//   await fs.rename(tempPath, dirPath)
//   // await fs.rename(file.path, uploadDir)
//   // const avatar = uploadDir
//   const avatarURL = `/public/avatars/${_id}/${originalname}`
//   // const avatarURL = `/public/avatars/${user._id}/${file.originalname}`
//   // const updatedUser = await User.findOneAndUpdate(_id, { avatarURL: avatarURL })
//   const updatedUser = await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
//   // const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
//   // await User.findOneAndUpdate(user._id, { avatarURL })
//   // if (!avatarURL) {
//   // await fs.unlink(tempPath)
//   // // await fs.unlink(file.path)
//   // throw Error
//   // }
//   // return avatarURL
//   return updatedUser

//   // const updateAvatar

//   // const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { subscription: body.subscription } }, { new: true, runValidators: true })
//   // return updatedUser
// }
// // avatar()

module.exports = avatar
