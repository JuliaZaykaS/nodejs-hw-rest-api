const bcrypt = require('bcrypt')
require('dotenv').config()
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')
// const sgMail = require('@sendgrid/mail')
const { User } = require('../../db')
const { AuthenticationError } = require('../../helpers')

// sgMail.setApiKey(process.env.SENDGRID_KEY)
const nodemailer = require('nodemailer')

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.mail.ru',
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: 'marsi-anka55@mail.ru',
    pass: EMAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const registration = async (body) => {
  const {
    email,
    password
  } = body

  const isUser = await User.findOne({ email })

  if (isUser) {
    throw new AuthenticationError('Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT))
  const avatarURL = gravatar.url(email, { protocol: 'https', d: 'mp' })

  const verificationToken = uuidv4()

  const user = new User({ email, password: hashedPassword, avatarURL, verificationToken })
  await user.save()

  const emailForSend = {
    to: email,
    from: 'marsi-anka55@mail.ru',
    subject: 'Регистрация на сайте',
    text: `Please, confirm your email address POST http://localhost:5555/users//verify/${verificationToken}`,
    html: `Please, <a href="http://localhost:5555/users//verify/${verificationToken}">confirm</a> your email address`
  }

  await transporter.sendMail(emailForSend)
  // .then(() => console.log('Email success send'))
  // .catch(error => console.log(error.message))
  // const msg = {
  //   to: email, // Change to your recipient
  //   from: 'marsi-anka55@mail.ru', // Change to your verified sender
  //   subject: 'Thank you for registration!',
  //   text: `Please, confirm your email address POST http://localhost:5555/users//verify/${verificationToken}`,
  //   html: `Please, <a href="http://localhost:5555/users//verify/${verificationToken}">confirm</a> your email address`,
  // }
  // await sgMail.send(msg)

  return user
}

module.exports = registration
