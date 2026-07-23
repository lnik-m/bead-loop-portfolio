import { useAsyncError } from 'react-router'
import { UNEXPECTED_ERROR } from '../constants'

export const ErrorFallback = () => {
  const error = useAsyncError() as Error
  const errorMessage = error.message || UNEXPECTED_ERROR

  // TODO add styles
  return <div>Error: {errorMessage}</div>
}
