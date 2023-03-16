/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-named-as-default */
import React, { useEffect } from 'react'
import * as Sentry from 'sentry-expo'

/* --- Types ----------------------------------------------------------------------------------- */

type ErrorBoundaryState = {
  hasError: boolean
}

export type ErrorBoundaryProps = {
  children: React.ReactNode
  renderErrorScreen: () => JSX.Element
}

export type SentryProviderProps = ErrorBoundaryProps & {
  sentryConfig: Sentry.SentryExpoNativeOptions
  silenceEnabledWarnings?: boolean
}

/* --- <ErrorBoundary/> ------------------------------------------------------------------------ */

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(/* error: unknown */) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: unknown /*, errorInfo: unknown */) {
    // You can also log the error to an error reporting service
    Sentry.Native.captureException(error)
  }

  render() {
    const { renderErrorScreen, children } = this.props
    const { hasError } = this.state

    // Fallback UI in case of error
    if (hasError) return renderErrorScreen()

    // No errors, render children
    return children
  }
}

/* --- <SentryProvider/> ----------------------------------------------------------------------- */

const SentryProvider = (props: SentryProviderProps) => {
  // Props
  const { children, sentryConfig, silenceEnabledWarnings, renderErrorScreen } =
    props

  // -- Effects --

  useEffect(() => {
    // Extract options
    const { enabled, dsn } = sentryConfig
    // Warn about disabled reporting
    if (!enabled && !silenceEnabledWarnings) {
      return console.warn('Sentry reporting is not enabled.')
    }
    // Warn about missing config
    if (!dsn) return console.warn('Sentry DSN is missing, disabling reporting.')
    // Initialize sentry
    Sentry.init(sentryConfig)
  }, [sentryConfig.dsn])

  // -- Render --

  return (
    <ErrorBoundary renderErrorScreen={renderErrorScreen}>
      {children}
    </ErrorBoundary>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export { SentryProvider }
