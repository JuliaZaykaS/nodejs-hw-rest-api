const path = require('path')
const fs = require('fs').promises
const Jimp = require('jimp')

const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers')

const avatarDir = path.join(__dirname, '../../', '/public/avatars') // storeImage
// const avatarDir = path.join(process.cwd(), '/avatars') // storeImage

const avatar = async (user, file) => {
  const { path: tempPath, originalname } = file
  const { _id } = user
  console.log('tempPath before', tempPath)
  // const avatarDir = path.join(__dirname, '../../', '/public/avatars', String(_id))
  // console.log(avatarDir)
  const newTempPath = tempPath

  if (!user) {
    throw new AuthorizationError('Not authorized')
  }
  //   const createFolderIsNotExist = async (folder) => {
  //   if (!(await isAccessible(folder))) {
  //     await fs.mkdir(folder)
  //   }
  // }

  const userDir = path.join(avatarDir, String(_id))
  // console.log('userdir', userDir)
  try {
    // let isAccessibleDir = await fs.access(userDir)
    const isAccessibleDir = await fs.access(userDir)
    console.log('isAccessibleDir', isAccessibleDir)
    // if (!isAccessibleDir) {
    // if (isAccessibleDir) {
    // if (isAccessibleDir === undefined) {
    //   isAccessibleDir = true
    //   // } else { isAccessibleDir = false }
    // }
    // await fs.unlink(userDir)
    // await fs.rmdir(userDir)
    console.log('isAccessibleDir', isAccessibleDir)
    // if (isAccessibleDir) {
    if (isAccessibleDir === undefined) {
      const filesInDir = await fs.readdir(userDir)
      console.log(filesInDir)
      // console.log(filesInDir[0])
      if (filesInDir.length !== 0) {
        // if (filesInDir.length === 0) return
        const deletedFile = path.join(userDir, '/', filesInDir[0])
        // console.log('deleted', deletedFile)
        // await fs.unlink(`${userDir}`)
        await fs.unlink(deletedFile)
      }
    }

    // console.log('filesInDir', filesInDir)
    // return
    // } else {
    // if (isAccessibleDir === false) {
    //   await fs.mkdir(userDir)
    // }
    // }
    // if (isAccessibleDir === undefined) {
    //   // await fs.unlink(userDir)
    //   // await fs.rmdir(userDir)
    //   const filesInDir = await fs.readdir(userDir)
    //   // console.log(filesInDir[0])
    //   if (filesInDir.length === 0) return
    //   const deletedFile = path.join(userDir, '/', filesInDir[0])
    //   // console.log('deleted', deletedFile)
    //   // await fs.unlink(`${userDir}`)
    //   await fs.unlink(deletedFile)

  //   // console.log('filesInDir', filesInDir)
  //   // return
  //   // } else {
  //   if (isAccessibleDir === false) {
  //     await fs.mkdir(userDir)
  //   }
  // }
  } catch (error) {
    await fs.mkdir(userDir)
    // throw error
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
  // const updatedFile = await Jimp.read(tempPath)
  // const updatedFile = await Jimp.read(newTempPath)
  // await updatedFile.resize(250, 250).write(tempPath)
  // await updatedFile.resize(250, 250).write(newTempPath)
  // await Jimp.read(tempPath).resize(250, 250).write(tempPath)
  // console.log(fileName)
  // console.log('updatedFile', updatedFile)
  // console.log('tempPath after', newTempPath)
  try {
    const updatedFile = await Jimp.read(tempPath)
    // const updatedFile = await Jimp.read(newTempPath)
    // console.log(newTempPath);
    // console.log(updatedFile)
    // console.log(1)
    // await updatedFile.resize(250, 250).write(tempPath)
    await updatedFile.resize(250, 250).writeAsync(tempPath)
    // const a = await updatedFile.resize(250, 250).write(tempPath)
    // await updatedFile.resize(250, 250).write(newTempPath)
    // console.log(a)
    // console.log(newTempPath)
    // console.log(2)
    await fs.rename(tempPath, fileName)
    // await fs.rename(, fileName)
    // await fs.rename(newTempPath, fileName)
    // console.log(3)
    const avatarURL = `/avatars/${_id}/${originalname}`
    const updatedUser = await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
    return updatedUser
    // await fs.rename(newTempPath, fileName)
    // await fs.rename(updatedFile, fileName)
    // await fs.rename(String(updatedFile), fileName)
  } catch (err) {
    await fs.unlink(tempPath)
    // await fs.unlink(newTempPath)
    // console.log(err)
    throw err
  }

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
  // const avatarURL = `/avatars/${_id}/${originalname}`
  // // const avatarURL = `/public/avatars/${user._id}/${file.originalname}`
  // // const updatedUser = await User.findOneAndUpdate(_id, { avatarURL: avatarURL })
  // const updatedUser = await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
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
  // return updatedUser
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
