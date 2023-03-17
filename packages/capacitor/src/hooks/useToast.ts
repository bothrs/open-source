import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

type ShowToastProps = {
  message: string
  color: string
  bgColor: string
  duration?: number
}

const useToast = () => {
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
    []
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
    []
  )

  return { showSuccessToast, showErrorToast }
}

export { useToast }
