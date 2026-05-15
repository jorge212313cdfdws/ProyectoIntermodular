import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../mecanico/MecanicoDashboard.css";
import Modal from "../../components/Modal/Modal";
import ClienteForm from "../../components/Forms/ClienteForm";
import VehiculoForm from "../../components/Forms/VehiculoForm";
import OrdenForm from "../../components/Forms/OrdenForm";
import MecanicoForm from "../../components/Forms/MecanicoForm";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import ClienteList from "../../components/ClienteList/ClienteList";
import VehiculoList from "../../components/VehiculoList/VehiculoList";
import OrdenList from "../../components/OrdenList/OrdenList";
import MecanicoList from "../../components/MecanicoList/MecanicoList";
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
    mecanicos,
    loading,
    confirmDialog,
    handleCliente,
    handleVehiculo,
    handleOrden,
    handleMecanico
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

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleCreateCliente = async (data) => {
    const success = await handleCliente.create(data, editingItem);
    if (success) handleCloseModal();
  };

  const handleCreateVehiculo = async (data) => {
    const success = await handleVehiculo.create(data, editingItem);
    if (success) handleCloseModal();
  };

  const handleCreateOrden = async (data) => {
    const success = await handleOrden.create(data, editingItem);
    if (success) handleCloseModal();
  };

  const handleCreateMecanico = async (data) => {
    const success = await handleMecanico.create(data, editingItem);
    if (success) handleCloseModal();
  };

  if (!adminData || loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mecanico-dashboard">
      <div className="mecanico-content">
        <div className="panel-trabajador">
          <h2>Panel de Administrador</h2>
          <p className="panel-subtitle">Gestión de clientes, vehículos y órdenes de trabajo</p>

          <div className="action-buttons">
            <button className="action-btn" onClick={() => handleOpenModal("cliente")}>+ Nuevo Usuario</button>
            <button className="action-btn" onClick={() => handleOpenModal("vehiculo")}>+ Nuevo Vehículo</button>
            <button className="action-btn" onClick={() => handleOpenModal("orden")}>+ Nueva Orden</button>
            <button className="action-btn" onClick={() => handleOpenModal("mecanico")}>+ Nuevo Mecánico</button>
          </div>

          <div className="tabs">
            <button
              className={activeTab === "clientes" ? "tab active" : "tab"}
              onClick={() => setActiveTab("clientes")}
            >
              Usuarios
            </button>
            <button
              className={activeTab === "vehiculos" ? "tab active" : "tab"}
              onClick={() => setActiveTab("vehiculos")}
            >
              Vehículos
            </button>
            <button
              className={activeTab === "ordenes" ? "tab active" : "tab"}
              onClick={() => setActiveTab("ordenes")}
            >
              Órdenes
            </button>
            <button
              className={activeTab === "mecanicos" ? "tab active" : "tab"}
              onClick={() => setActiveTab("mecanicos")}
            >
              Mecánicos
            </button>
          </div>

          {activeTab === "clientes" && (
            <ClienteList
              clientes={clientes}
              onEdit={(item) => handleOpenModal("cliente", item)}
              onDelete={handleCliente.delete}
            />
          )}

          {activeTab === "vehiculos" && (
            <VehiculoList
              vehiculos={vehiculos}
              ordenes={ordenes}
              onEdit={(item) => handleOpenModal("vehiculo", item)}
              onDelete={handleVehiculo.delete}
            />
          )}

          {activeTab === "ordenes" && (
            <OrdenList
              ordenes={ordenes}
              onEdit={(item) => handleOpenModal("orden", item)}
              onDelete={handleOrden.delete}
            />
          )}

          {activeTab === "mecanicos" && (
            <MecanicoList
              mecanicos={mecanicos}
              onEdit={(item) => handleOpenModal("mecanico", item)}
              onDelete={handleMecanico.delete}
            />
          )}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {modalType === "cliente" && (
          <ClienteForm
            onSubmit={handleCreateCliente}
            onCancel={handleCloseModal}
            initialData={editingItem}
          />
        )}
        {modalType === "vehiculo" && (
          <VehiculoForm
            onSubmit={handleCreateVehiculo}
            onCancel={handleCloseModal}
            clientes={clientes}
            initialData={editingItem}
          />
        )}
        {modalType === "orden" && (
          <OrdenForm
            onSubmit={handleCreateOrden}
            onCancel={handleCloseModal}
            vehiculos={vehiculos}
            clientes={clientes}
            mecanicos={mecanicos}
            initialData={editingItem}
          />
        )}
        {modalType === "mecanico" && (
          <MecanicoForm
            onSubmit={handleCreateMecanico}
            onCancel={handleCloseModal}
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
