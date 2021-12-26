const path = require('path')
const fs = require('fs').promises
const Jimp = require('jimp')

const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers')

const avatar = async (user, file) => {
  const { path: tempPath, originalname } = file
  const { _id } = user
  // tempPath - это путь к файлу во временной папке
console.log(file)
  if (!user) {
    throw new AuthorizationError('Not authorized')
  }
  // получаем путь до папки, где будут храниться аватары пользователей
  const avatarDir = path.join(__dirname, '../../', '/public/avatars')

  // создаем путь к папке для хранения аватаров конкретного пользователя
  const userDir = path.join(avatarDir, String(_id))

  // проверяем, есть ли уже папка для аватаров у конкретного пользователя
  // если уже есть, то удаляем предыдущую аватарку,
  // если еще нет, то создаем папку для пользователя
  try {
    const isAccessibleDir = await fs.access(userDir)
    if (isAccessibleDir === undefined) {
      const filesInDir = await fs.readdir(userDir)
      if (filesInDir.length !== 0) {
        const deletedFile = path.join(userDir, '/', filesInDir[0])
        await fs.unlink(deletedFile)
      }
    }
  } catch (error) {
    await fs.mkdir(userDir)
  }

  // создаем уникальное название для аватарки и путь, по которому она будет храниться
  const newFileName = `${String(_id)}-${originalname}`
  const filePath = path.join(userDir, newFileName)

  // сжимаем аватарку с помощью jimp до нужных размеров, затем перемещаем ее из временной папки в папку пользователя
  // записываем ссылку на аватарку в БД и отдаем пользователю в ответ
  try {
    const updatedFile = await Jimp.read(tempPath)
    await updatedFile.resize(250, 250).writeAsync(tempPath)
    await fs.rename(tempPath, filePath)

    const avatarURL = `/avatars/${_id}/${newFileName}`
    const updatedUser = await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
    return updatedUser
  } catch (err) {
    await fs.unlink(tempPath)
    throw err
  }
}

module.exports = avatar


// "AvatarRequest": {
//   "type": "object",
//   "properties": {
//     "file": {
//       "type": "array",
//       "items": {
//         "type": "string",
//         "format": "binary"
//       }
//     }
//   }
// },
// "file":{

//   "image/jpeg": {
//     "schema": {
//       "type": "string",
//       "format": "binary"
//     }
//   },
//   "image/png": {
//     "schema": {
//       "type": "string",
//       "format": "binary"
//     }
//   }
// }