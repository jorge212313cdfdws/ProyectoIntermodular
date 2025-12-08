import { useState } from 'react';
import { showToast } from '../components/Toast/ToastContainer';

export function useCrudOperations(apiUrl, entityName) {
  const [confirmDialog, setConfirmDialog] = useState(null);

  const create = async (data, onSuccess) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        showToast(`${entityName} creado correctamente`, "success");
        onSuccess && onSuccess();
      } else {
        showToast(`Error al crear ${entityName}`, "error");
      }
    } catch (error) {
      console.error(`Error al crear ${entityName}:`, error);
      showToast(`Error al crear ${entityName}`, "error");
    }
  };

  const update = async (id, data, onSuccess) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        showToast(`${entityName} actualizado correctamente`, "success");
        onSuccess && onSuccess();
      } else {
        showToast(`Error al actualizar ${entityName}`, "error");
      }
    } catch (error) {
      console.error(`Error al actualizar ${entityName}:`, error);
      showToast(`Error al actualizar ${entityName}`, "error");
    }
  };

  const remove = (id, onSuccess) => {
    setConfirmDialog({
      message: `¿Estás seguro de eliminar este ${entityName}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          });
          
          if (response.ok) {
            showToast(`${entityName} eliminado correctamente`, "success");
            onSuccess && onSuccess();
          } else {
            showToast(`Error al eliminar ${entityName}`, "error");
          }
        } catch (error) {
          console.error(`Error al eliminar ${entityName}:`, error);
          showToast(`Error al eliminar ${entityName}`, "error");
        }
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  return { create, update, remove, confirmDialog, setConfirmDialog };
}
