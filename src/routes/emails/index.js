// const dotenv = require('dotenv')
// const path = require('path')
// dotenv.config({ path: path.join(__dirname, "../../../", ".env") });
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (msg) => sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

module.exports = sendEmail