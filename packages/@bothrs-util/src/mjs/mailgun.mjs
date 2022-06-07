export const mailgun = {
  send(message) {
    if (message.to.endsWith('.test')) {
      return Promise.resolve({ test: true })
    }
    return new Promise((resolve, reject) => {
      const mailgunMessages = require('mailgun-js')({
        apiKey: process.env.MAILGUN_SECRET,
        domain: process.env.MAILGUN_DOMAIN,
      }).messages()

      console.log('mailgun.send', message.to)
      mailgunMessages.send(message, (error, body) => {
        if (error) {
          console.log('mailgun.send error', error)
          reject(error)
        } else {
          console.log('mailgun.send success', body)
          resolve(body)
        }
      })
    })
  },
}
