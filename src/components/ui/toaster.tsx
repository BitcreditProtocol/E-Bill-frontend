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

  const icons = {
    success: <CircleCheckIcon className="w-5 h-5 text-signal-success" strokeWidth="1px"/>,
    info: <InfoIcon className="w-5 h-5 text-text-300" strokeWidth="1px"/>,
    warning: <TriangleAlertIcon className="w-5 h-5 text-signal-alert" strokeWidth="1px"/>,
    error: <OctagonXIcon className="w-5 h-5 text-signal-error" strokeWidth="1px"/>,
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const icon = icons[variant || 'info'];
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-2">
              {icon}
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
