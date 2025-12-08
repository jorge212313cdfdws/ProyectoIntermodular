import { useState, useCallback } from 'react';
import Toast from './Toast';

let addToastRef = null;

export function useToast() {
  return useCallback((message, type = 'info') => {
    if (addToastRef) {
      addToastRef(message, type);
    }
  }, []);
}

export function showToast(message, type = 'info') {
  if (addToastRef) {
    addToastRef(message, type);
  }
}

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Exponer addToast globalmente
  addToastRef = addToast;

  return (
    <div>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
