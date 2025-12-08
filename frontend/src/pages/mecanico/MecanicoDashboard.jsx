import { useState } from "react";
import "./MecanicoDashboard.css";
import ClienteList from "../../components/ClienteList/ClienteList";
import VehiculoList from "../../components/VehiculoList/VehiculoList";
import OrdenList from "../../components/OrdenList/OrdenList";
import { useAdminData } from "../../hooks/useAdminData";

function MecanicoDashboard() {
  const [activeTab, setActiveTab] = useState("clientes");
  
  const {
    clientes,
    vehiculos,
    ordenes,
    loading
  } = useAdminData();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mecanico-dashboard">
      <div className="mecanico-content">
        <div className="panel-trabajador">
          <h2>Panel de Trabajador</h2>
          <p className="panel-subtitle">Gesti�n y mantenimiento de Clientes/Coches</p>
          
          <div className="action-buttons">
            <button className="action-btn">+ Nuevo Cliente</button>
            <button className="action-btn">+ Nuevo Coche</button>
            <button className="action-btn">+ Asignar Coche</button>
            <button className="action-btn">+ Nueva Issue</button>
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
            <div className="content-section">
              <h3>Lista de Clientes</h3>
              <p className="section-subtitle">Gesti�n de clientes/Vehiculos</p>
              <ClienteList clientes={clientes} />
            </div>
          )}

          {activeTab === "coches" && (
            <div className="content-section">
              <h3>Lista de Veh�culos</h3>
              <p className="section-subtitle">Gesti�n de Cambios y Reparaci�n</p>
              <VehiculoList vehiculos={vehiculos} ordenes={ordenes} />
            </div>
          )}

          {activeTab === "issue" && (
            <div className="content-section">
              <h3>Lista de Issues</h3>
              <p className="section-subtitle">Problemas Registrados en el Taller</p>
              <OrdenList ordenes={ordenes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MecanicoDashboard;
