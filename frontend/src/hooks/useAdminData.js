import { useState, useEffect } from "react";
import { showToast } from "../components/Toast/ToastContainer";

export const useAdminData = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const API_BASE = `${import.meta.env.VITE_API_URL}/api`;
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [clientesRes, vehiculosRes, ordenesRes] = await Promise.all([
        fetch(`${API_BASE}/clientes`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_BASE}/vehiculos`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_BASE}/ordenes`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      const [clientesData, vehiculosData, ordenesData] = await Promise.all([
        clientesRes.json(),
        vehiculosRes.json(),
        ordenesRes.json()
      ]);

      setClientes(clientesData);
      setVehiculos(vehiculosData);
      setOrdenes(ordenesData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CRUD genérico
  const createOrUpdate = async (endpoint, data, entityName, editingItem) => {
    try {
      const url = editingItem 
        ? `${API_BASE}/${endpoint}/${editingItem.id}`
        : `${API_BASE}/${endpoint}`;
      const method = editingItem ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        await fetchData();
        showToast(
          editingItem ? `${entityName} actualizado correctamente` : `${entityName} creado correctamente`,
          "success"
        );
        return true;
      } else {
        showToast(`Error al guardar ${entityName.toLowerCase()}`, "error");
        return false;
      }
    } catch (error) {
      console.error(`Error al guardar ${entityName.toLowerCase()}:`, error);
      showToast(`Error al guardar ${entityName.toLowerCase()}`, "error");
      return false;
    }
  };

  const deleteEntity = async (endpoint, id, entityName) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        message: `¿Estás seguro de eliminar este ${entityName.toLowerCase()}?`,
        onConfirm: async () => {
          try {
            const response = await fetch(`${API_BASE}/${endpoint}/${id}`, {
              method: "DELETE",
              headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (response.ok) {
              await fetchData();
              showToast(`${entityName} eliminado correctamente`, "success");
            } else {
              showToast(`Error al eliminar ${entityName.toLowerCase()}`, "error");
            }
          } catch (error) {
            console.error(`Error al eliminar ${entityName.toLowerCase()}:`, error);
            showToast(`Error al eliminar ${entityName.toLowerCase()}`, "error");
          }
          setConfirmDialog(null);
          resolve();
        },
        onCancel: () => {
          setConfirmDialog(null);
          resolve();
        }
      });
    });
  };

  // Handlers específicos
  const handleCliente = {
    create: (data, editingItem) => createOrUpdate("clientes", data, "Cliente", editingItem),
    delete: (id) => deleteEntity("clientes", id, "Cliente")
  };

  const handleVehiculo = {
    create: (data, editingItem) => createOrUpdate("vehiculos", data, "Vehículo", editingItem),
    delete: (id) => deleteEntity("vehiculos", id, "Vehículo")
  };

  const handleOrden = {
    create: (data, editingItem) => createOrUpdate("ordenes", data, "Orden", editingItem),
    delete: (id) => deleteEntity("ordenes", id, "Orden")
  };

  return {
    clientes,
    vehiculos,
    ordenes,
    loading,
    confirmDialog,
    setConfirmDialog,
    handleCliente,
    handleVehiculo,
    handleOrden,
    fetchData
  };
};
