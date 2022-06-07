// .env
// MAIL_DRIVER=smtp
// MAIL_HOST=smtp.company.org
// MAIL_PORT=587
// MAIL_USERNAME=
// MAIL_PASSWORD=
// MAIL_ENCRYPTION=tls
// MAIL_FROM_NAME="Hello Company"
// MAIL_FROM_ADDRESS="info@company.org"

export async function sendMail(message, env = process.env) {
  const nodemailer = require('nodemailer')

  const testAccount = !env.MAIL_HOST && (await nodemailer.createTestAccount())

  const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST || 'smtp.ethereal.email',
    port: env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: testAccount || {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
    },
  })

  if (!message.html && message.text) {
    message.html = message.text
  } else if (!message.text && message.html) {
    message.text = message.html
  } else if (!message.text && !message.html) {
    throw new Error('Empty message')
  }

  const info = await transporter.sendMail({
    from: `"${env.MAIL_FROM_NAME}" <${env.MAIL_FROM_ADDRESS}>`,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  })

  if (testAccount) {
    console.log('Preview URL', nodemailer.getTestMessageUrl(info))
  }

  return info
}
