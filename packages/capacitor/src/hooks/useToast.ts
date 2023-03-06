import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useTheme } from 'styled-components'

type ShowToastProps = {
  message: string
  color: string
  bgColor: string
  duration?: number
}

const useToast = () => {
  const theme = useTheme()

  const showSuccessToast = useCallback(
    ({ message, color, bgColor, duration = 4000 }: ShowToastProps) => {
      return toast.success(message, {
        position: 'bottom-center',
        style: {
          backgroundColor: bgColor,
          color,
        },
        duration,
      })
    },
    [theme]
  )

  const showErrorToast = useCallback(
    ({ message, color, bgColor, duration = 4000 }: ShowToastProps) => {
      return toast.error(message, {
        position: 'bottom-center',
        style: {
          backgroundColor: bgColor,
          color,
        },
        duration,
      })
    },
    [theme]
  )

  return { showSuccessToast, showErrorToast }
}

export { useToast }
