import { useAsyncError } from 'react-router'

const UNEXPECTED_ERROR = 'An unexpected error occurred'

export const ErrorFallback = () => {
  const error = useAsyncError() as Error
  const errorMessage = error.message || UNEXPECTED_ERROR

  // TODO add styles
  return <div>Error: {errorMessage}</div>
}
