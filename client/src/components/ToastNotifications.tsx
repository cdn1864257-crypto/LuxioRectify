import { useState, useEffect } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
const toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

export const showToast = (message: string, type: Toast['type'] = 'success') => {
  const id = String(++toastId);
  const newToast: Toast = { id, message, type };
  
  toasts = [...toasts, newToast];
  toastListeners.forEach(listener => listener(toasts));
  
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    toastListeners.forEach(listener => listener(toasts));
  }, 3000);
};

export function ToastNotifications() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setCurrentToasts([...newToasts]);
    };
    
    toastListeners.push(listener);
    
    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2" data-testid="toast-container">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast p-4 rounded-lg shadow-lg text-white max-w-sm slide-in ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
          data-testid={`toast-${toast.type}`}
        >
          <div className="flex items-center space-x-3">
            <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}`}></i>
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
