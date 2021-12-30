const nodemailer = require('nodemailer')
require('dotenv').config()

const verificationMessage = async(email, verificationToken) => {
  const { EMAIL_PASSWORD } = process.env

  const nodemailerConfig = {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'marsi-anka55@mail.ru',
      pass: EMAIL_PASSWORD
    }
  }
  const transporter = nodemailer.createTransport(nodemailerConfig)
  const emailForSend = {
    to: email,
    from: 'marsi-anka55@mail.ru',
    subject: 'Регистрация на сайте',
    text: `Please, confirm your email address POST https://backend-for-phonebook.herokuapp.com/users//verify/${verificationToken}`,
    html: `Please, <a href="https://backend-for-phonebook.herokuapp.com/users//verify/${verificationToken}">confirm</a> your email address`
  }

  transporter.sendMail(emailForSend)
}

module.exports = verificationMessage
