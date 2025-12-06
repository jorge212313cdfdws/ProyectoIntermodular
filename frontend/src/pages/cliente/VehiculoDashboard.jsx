import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./VehiculoDashboard.css";

function VehiculoDashboard({ clienteId }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/clientes/${clienteId}`);
        
        if (response.ok) {
          const data = await response.json();
          setVehiculos(data.vehiculos || []);
        }
      } catch (error) {
        console.error("Error al cargar vehículos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clienteId) {
      fetchVehiculos();
    }
  }, [clienteId]);

  if (loading) {
    return (
      <div className="vehiculo-card">
        <h2>
          <span className="icon">🚗</span> Mi Vehículo
        </h2>
        <div className="loading-small">Cargando...</div>
      </div>
    );
  }

  const vehiculo = vehiculos.length > 0 ? vehiculos[0] : null;

  return (
    <div className="vehiculo-card">
      <h2>
        <span className="icon">🚗</span> Mi Vehículo
      </h2>
      {vehiculo ? (
        <>
          <div className="info-row">
            <span className="label">🏷️ Marca y Modelo</span>
            <span className="value">{vehiculo.marca} {vehiculo.modelo}</span>
          </div>
          <div className="info-row">
            <span className="label">📅 Año</span>
            <span className="value">{vehiculo.anio || '-'}</span>
          </div>
          <div className="info-row">
            <span className="label">🔢 Matrícula</span>
            <span className="value">{vehiculo.placa || '-'}</span>
          </div>
        </>
      ) : (
        <div className="no-data">
          <p>No hay vehículos registrados aún</p>
        </div>
      )}
    </div>
  );
}

VehiculoDashboard.propTypes = {
  clienteId: PropTypes.number.isRequired
};

export default VehiculoDashboard;
