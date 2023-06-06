const nodemailer = require("nodemailer");
require("dotenv").config();

const verificationMessage = async (email, verificationToken) => {
  const { EMAIL_PASSWORD, BACKEND_URL, SEND_EMAIL } = process.env;

  const nodemailerConfig = {
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      // user: "marsi-anka55@mail.ru",
      user: SEND_EMAIL,
      pass: EMAIL_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(nodemailerConfig);
  const emailForSend = {
    to: email,
    // from: "marsi-anka55@mail.ru",
    from: SEND_EMAIL,
    subject: "Регистрация на сайте",
    text: `Please, confirm your email address POST ${BACKEND_URL}/users/verify/${verificationToken}`,
    html: `Please, <a href="${BACKEND_URL}/users/verify/${verificationToken}">confirm</a> your email address`,
  };

  transporter.sendMail(emailForSend);
};

module.exports = verificationMessage;
