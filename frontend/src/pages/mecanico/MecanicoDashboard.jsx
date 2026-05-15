import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MecanicoDashboard.css";
import Modal from "../../components/Modal/Modal";
import OrdenForm from "../../components/Forms/OrdenForm";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import ClienteList from "../../components/ClienteList/ClienteList";
import VehiculoList from "../../components/VehiculoList/VehiculoList";
import OrdenList from "../../components/OrdenList/OrdenList";
import { useAdminData } from "../../hooks/useAdminData";

function MecanicoDashboard() {
  const [activeTab, setActiveTab] = useState("clientes");
  const [showModal, setShowModal] = useState(false);
  const [editingOrden, setEditingOrden] = useState(null);
  const navigate = useNavigate();

  const {
    clientes,
    vehiculos,
    ordenes,
    loading,
    confirmDialog,
    handleOrden,
  } = useAdminData();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "mecanico") {
      navigate("/");
    }
  }, [navigate]);

  const handleOpenModal = (orden = null) => {
    setEditingOrden(orden);
    setShowModal(true);
  };

  const handleSubmitOrden = async (ordenData) => {
    const success = await handleOrden.create(ordenData, editingOrden);
    if (success) {
      setShowModal(false);
      setEditingOrden(null);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mecanico-dashboard">
      <div className="mecanico-content">
        <div className="panel-trabajador">
          <h2>Panel de Trabajador</h2>
          <p className="panel-subtitle">Gestión y mantenimiento del Taller</p>

          <div className="action-buttons">
            <button className="action-btn" onClick={() => handleOpenModal()}>
              + Nueva Issue
            </button>
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
            <ClienteList clientes={clientes} />
          )}

          {activeTab === "coches" && (
            <VehiculoList vehiculos={vehiculos} ordenes={ordenes} />
          )}

          {activeTab === "issue" && (
            <OrdenList
              ordenes={ordenes}
              onEdit={(orden) => handleOpenModal(orden)}
              onDelete={handleOrden.delete}
            />
          )}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <OrdenForm
          onSubmit={handleSubmitOrden}
          onCancel={() => setShowModal(false)}
          vehiculos={vehiculos}
          clientes={clientes}
          initialData={editingOrden}
        />
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

export default MecanicoDashboard;
