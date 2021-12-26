
const { login } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const loginController = async (req, res, next) => {
  // const token = await login(req.body)
  const user = await login(req.body)
  console.log(user)
  // const upUser = await login(req.body)

  // return res.status(HTTPCodes.OK).json({
  //   token,
  //   user: {
  //     email: req.body.email,
  //     subscription: 'starter'
  //   }

  // })
  return res.status(HTTPCodes.OK).json({
    // token: upUser.token,
    token: user.token,
    user: {
      name: user.upUser.name,
      email: user.upUser.email,
      subscription: 'starter'
    }

  })
}

module.exports = loginController
