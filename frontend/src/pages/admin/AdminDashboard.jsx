import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../mecanico/MecanicoDashboard.css";
import Modal from "../../components/Modal/Modal";
import ClienteForm from "../../components/Forms/ClienteForm";
import VehiculoForm from "../../components/Forms/VehiculoForm";
import AsignarVehiculoForm from "../../components/Forms/AsignarVehiculoForm";
import OrdenForm from "../../components/Forms/OrdenForm";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import ClienteList from "../../components/ClienteList/ClienteList";
import VehiculoList from "../../components/VehiculoList/VehiculoList";
import OrdenList from "../../components/OrdenList/OrdenList";
import { showToast } from "../../components/Toast/ToastContainer";
import { useAdminData } from "../../hooks/useAdminData";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("clientes");
  const [adminData, setAdminData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  const {
    clientes,
    vehiculos,
    ordenes,
    loading,
    confirmDialog,
    handleCliente,
    handleVehiculo,
    handleOrden
  } = useAdminData();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
      return;
    }

    setAdminData(currentUser);
  }, [navigate]);

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCreateCliente = async (clienteData) => {
    const success = await handleCliente.create(clienteData, editingItem);
    if (success) {
      setShowModal(false);
      setEditingItem(null);
    }
  };

  const handleCreateVehiculo = async (vehiculoData) => {
    const success = await handleVehiculo.create(vehiculoData, editingItem);
    if (success) {
      setShowModal(false);
      setEditingItem(null);
    }
  };

  const handleCreateOrden = async (ordenData) => {
    const success = await handleOrden.create(ordenData, editingItem);
    if (success) {
      setShowModal(false);
      setEditingItem(null);
    }
  };

  const handleAsignarVehiculo = async (asignacionData) => {
    showToast("Funcionalidad de asignación en desarrollo", "info");
    setShowModal(false);
  };

  if (!adminData || loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mecanico-dashboard">
      <div className="mecanico-content">
        <div className="panel-trabajador">
          <h2>Panel de Administrador</h2>
          <p className="panel-subtitle">Gestión y mantenimiento de Clientes/Coches</p>
          
          <div className="action-buttons">
            <button className="action-btn" onClick={() => handleOpenModal("cliente")}>+ Nuevo Cliente</button>
            <button className="action-btn" onClick={() => handleOpenModal("vehiculo")}>+ Nuevo Coche</button>
            <button className="action-btn" onClick={() => handleOpenModal("asignar")}>+ Asignar Coche</button>
            <button className="action-btn" onClick={() => handleOpenModal("orden")}>+ Nueva Issue</button>
          </div>

          <div className="tabs">
            <button 
              className={activeTab === "clientes" ? "tab active" : "tab"}
              onClick={() => setActiveTab("clientes")}
            >
              Clientes
            </button>
            <button 
              className={activeTab === "coches" ? "tab active" : "tab"}
              onClick={() => setActiveTab("coches")}
            >
              Coches
            </button>
            <button 
              className={activeTab === "issue" ? "tab active" : "tab"}
              onClick={() => setActiveTab("issue")}
            >
              Issue
            </button>
          </div>

          {activeTab === "clientes" && (
            <ClienteList
              clientes={clientes}
              onEdit={(cliente) => handleOpenModal("cliente", cliente)}
              onDelete={handleCliente.delete}
            />
          )}

          {activeTab === "coches" && (
            <VehiculoList
              vehiculos={vehiculos}
              ordenes={ordenes}
              onEdit={(vehiculo) => handleOpenModal("vehiculo", vehiculo)}
              onDelete={handleVehiculo.delete}
            />
          )}

          {activeTab === "issue" && (
            <OrdenList
              ordenes={ordenes}
              onEdit={(orden) => handleOpenModal("orden", orden)}
              onDelete={handleOrden.delete}
            />
          )}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalType === "cliente" && (
          <ClienteForm 
            onSubmit={handleCreateCliente}
            onCancel={() => setShowModal(false)}
            initialData={editingItem}
          />
        )}
        {modalType === "vehiculo" && (
          <VehiculoForm 
            onSubmit={handleCreateVehiculo}
            onCancel={() => setShowModal(false)}
            clientes={clientes}
            initialData={editingItem}
          />
        )}
        {modalType === "asignar" && (
          <AsignarVehiculoForm 
            onSubmit={handleAsignarVehiculo}
            onCancel={() => setShowModal(false)}
            vehiculos={vehiculos}
            clientes={clientes}
          />
        )}
        {modalType === "orden" && (
          <OrdenForm 
            onSubmit={handleCreateOrden}
            onCancel={() => setShowModal(false)}
            vehiculos={vehiculos}
            clientes={clientes}
            initialData={editingItem}
          />
        )}
      </Modal>

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
