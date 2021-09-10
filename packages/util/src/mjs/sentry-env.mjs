import Sentry from '@sentry/node'

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  })
} else if (process.env.NODE_ENV !== 'development') {
  console.error('Sentry DSN is missing!')
}
