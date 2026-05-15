import { useState, useEffect } from "react";
import { showToast } from "../components/Toast/ToastContainer";

export const useAdminData = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
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

      const results = await Promise.allSettled([
        fetch(`${API_BASE}/clientes`,  { headers: { "Authorization": `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API_BASE}/vehiculos`, { headers: { "Authorization": `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API_BASE}/ordenes`,   { headers: { "Authorization": `Bearer ${token}` } }).then(r => r.json()),
        fetch(`${API_BASE}/mecanicos`, { headers: { "Authorization": `Bearer ${token}` } }).then(r => r.json())
      ]);

      const [clientesResult, vehiculosResult, ordenesResult, mecanicosResult] = results;

      if (clientesResult.status === "fulfilled")  setClientes(clientesResult.value);
      if (vehiculosResult.status === "fulfilled") setVehiculos(vehiculosResult.value);
      if (ordenesResult.status === "fulfilled")   setOrdenes(ordenesResult.value);
      if (mecanicosResult.status === "fulfilled") setMecanicos(mecanicosResult.value);
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

  const handleMecanico = {
    create: (data, editingItem) => createOrUpdate("mecanicos", data, "Mecánico", editingItem),
    delete: (id) => deleteEntity("mecanicos", id, "Mecánico")
  };

  return {
    clientes,
    vehiculos,
    ordenes,
    mecanicos,
    loading,
    confirmDialog,
    setConfirmDialog,
    handleCliente,
    handleVehiculo,
    handleOrden,
    handleMecanico,
    fetchData
  };
};
