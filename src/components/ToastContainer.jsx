import { useToast } from "../context/ToastContext";

const ICONS = {
  success: "✓",
  error: "✕",
  info: "♫",
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <span className="toast-icon">
            {ICONS[toast.type] || ICONS.info}
          </span>

          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;