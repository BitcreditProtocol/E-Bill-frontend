import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant: string | null | undefined) => {
    switch (variant) {
      case 'success':
        return <CircleCheckIcon className="h-5 w-5 text-signal-success" />
      case 'info':
        return <InfoIcon className="h-5 w-5" />
      case 'warning':
        return <TriangleAlertIcon className="h-5 w-5 text-signal-alert" />
      case 'error':
        return <OctagonXIcon className="h-5 w-5 text-signal-error" />
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, position, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-2">
              {getIcon(variant)}
              <div className="flex flex-col gap-1.5">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport position={toasts[0]?.position} />
    </ToastProvider>
  )
}
