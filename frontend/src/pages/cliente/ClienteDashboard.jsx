import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VehiculoDashboard from "./VehiculoDashboard";
import "./ClienteDashboard.css";

function ClienteDashboard() {
  const [clienteData, setClienteData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener usuario logueado del localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || !currentUser.id) {
      navigate("/");
      return;
    }

    if (currentUser.role === "admin") {
      navigate("/admin");
      return;
    }

    // Usar los datos del localStorage
    setClienteData(currentUser);
  }, [navigate]);

  if (!clienteData) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="cliente-dashboard">
      <header className="cliente-header">
        <h1>Su Vehículo</h1>
        <p className="subtitle">Sistema de Gestión de Vehículos</p>
      </header>

      <div className="cliente-content">
        <div className="perfil-card">
          <h2>
            <span className="icon">👤</span> Mi perfil
          </h2>
          <div className="info-row">
            <span className="label">👤 Nombre</span>
            <span className="value">{clienteData.nombreCompleto}</span>
          </div>
          <div className="info-row">
            <span className="label">✉️ Email</span>
            <span className="value">{clienteData.email}</span>
          </div>
          <div className="info-row">
            <span className="label">📍 Dirección</span>
            <span className="value">{clienteData.direccion}</span>
          </div>
        </div>

        <VehiculoDashboard clienteId={clienteData.id} />

        <div className="historial-card">
          <h2>
            <span className="icon">🔧</span> Historial de Reparaciones y Cambios
          </h2>
          <p className="subtitle-historial">Mantenimiento del Vehículo</p>
          <div className="no-data">
            <p>No hay servicios registrados aún</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClienteDashboard;
