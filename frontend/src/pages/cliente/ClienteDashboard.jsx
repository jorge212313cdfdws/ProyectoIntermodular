import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VehiculoDashboard from "./VehiculoDashboard";
import "./ClienteDashboard.css";

function ClienteDashboard() {
  const [clienteData, setClienteData] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || !currentUser.id) {
      navigate("/");
      return;
    }

    if (currentUser.role === "admin") {
      navigate("/admin");
      return;
    }

    setClienteData(currentUser);

    const token = localStorage.getItem("authToken");
    fetch(`${import.meta.env.VITE_API_URL}/api/ordenes/cliente/${currentUser.id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setOrdenes(Array.isArray(data) ? data : []))
      .catch(() => setOrdenes([]));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!clienteData) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="cliente-dashboard">
      <header className="cliente-header">
        <h1>Su Vehículo</h1>
        <p className="subtitle">Sistema de Gestión de Vehículos</p>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
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
          {ordenes.length === 0 ? (
            <div className="no-data">
              <p>No hay servicios registrados aún</p>
            </div>
          ) : (
            <div className="ordenes-list">
              {ordenes.map(orden => (
                <div key={orden.id} className="orden-item">
                  <div className="orden-header">
                    <span className="orden-fecha">{orden.fechaCreacion || 'Sin fecha'}</span>
                    <span className="orden-costo">{orden.costoTotal > 0 ? `${orden.costoTotal} €` : 'Sin coste'}</span>
                  </div>
                  <p className="orden-descripcion">{orden.descripcion || 'Sin descripción'}</p>
                  {orden.vehiculo && (
                    <p className="orden-vehiculo">🚗 {orden.vehiculo.marca} {orden.vehiculo.modelo} - {orden.vehiculo.placa}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClienteDashboard;
