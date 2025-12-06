import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MecanicoDashboard.css";

function MecanicoDashboard() {
  const [activeTab, setActiveTab] = useState("clientes");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="mecanico-dashboard">
      <header className="mecanico-header">
        <div className="header-content">
          <div>
            <h1>Taller Mecánico</h1>
            <p className="subtitle">Sistema de Gestión de Vehículos</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
        </div>
      </header>

      <div className="mecanico-content">
        <div className="panel-trabajador">
          <h2>Panel de Trabajador</h2>
          <p className="panel-subtitle">Gestión y mantenimiento de Clientes/Coches</p>
          
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
              <p className="section-subtitle">Gestión de clientes/Vehiculos</p>
              <div className="clientes-list">
                <div className="cliente-item">
                  <div className="cliente-info">
                    <span className="cliente-icon">👤</span>
                    <div>
                      <p className="cliente-nombre">Miguel Ferrero</p>
                      <p className="cliente-email">Migue8455@example.com</p>
                      <p className="cliente-direccion">📍 C/Revolucion n5</p>
                    </div>
                  </div>
                  <div className="cliente-telefono">
                    📞 60524854
                  </div>
                </div>
                <div className="vehiculos-section">
                  <p className="vehiculos-label">Vehiculos:</p>
                  <p className="vehiculo-info">Seat Leon (2545MBF)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "coches" && (
            <div className="content-section">
              <h3>Lista de Vehículos</h3>
              <p className="section-subtitle">Gestión de Cambios y Reparación</p>
              <div className="vehiculos-list">
                <div className="vehiculo-card">
                  <div className="vehiculo-header">
                    <span className="vehiculo-icon">🚗</span>
                    <span>Seat Leon (2545MBF)</span>
                    <button className="estado-btn activo">Activo</button>
                  </div>
                  <div className="vehiculo-details">
                    <p>Año: 2008</p>
                    <p>Matrícula: 2545MBF</p>
                  </div>
                  <div className="vehiculo-owner">
                    <p>🔧 Propietario: Miguel Ferrero</p>
                    <p>Total Issues: 1</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "issue" && (
            <div className="content-section">
              <h3>Lista de Issues</h3>
              <p className="section-subtitle">Problemas Registrados en el Taller</p>
              <div className="issues-list">
                <div className="issue-item">
                  <div className="issue-header">
                    <span className="issue-icon">⚙️</span>
                    <span>Cambio de Aceite</span>
                  </div>
                  <p className="issue-description">Servicio Programado</p>
                  <p className="issue-vehicle">🚗 Seat Leon (2545MBF) - Miguel Ferrero</p>
                  <p className="issue-service">🔧 Servicios</p>
                  <div className="issue-status">
                    <div className="status-row">
                      <span>Estado</span>
                      <select className="status-select">
                        <option>Pendiente</option>
                        <option>En Proceso</option>
                        <option>Completado</option>
                      </select>
                    </div>
                    <div className="priority-row">
                      <span>Prioridad</span>
                      <select className="priority-select">
                        <option>Media</option>
                        <option>Alta</option>
                        <option>Baja</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MecanicoDashboard;
