import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function SuccessToast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-up">
      <div className="bg-white rounded-2xl shadow-lg border-l-4 border-medical-green flex items-start gap-3 p-4 max-w-sm">
        <CheckCircle className="w-5 h-5 text-medical-green mt-0.5 shrink-0" />
        <p className="text-sm font-medium text-foreground leading-snug">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface UseToastReturn {
  show: boolean;
  message: string;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export function useToast(): UseToastReturn {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setShow(true);
  };

  const hideToast = () => setShow(false);

  return { show, message, showToast, hideToast };
}
