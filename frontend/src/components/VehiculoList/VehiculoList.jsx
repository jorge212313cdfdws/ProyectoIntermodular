function VehiculoList({ vehiculos, ordenes, onEdit, onDelete }) {
  return (
    <div className="content-section">
      <h3>Lista de Vehículos</h3>
      <p className="section-subtitle">Gestión de Cambios y Reparación</p>
      <div className="vehiculos-list">
        {vehiculos.map((vehiculo) => {
          const ordenesVehiculo = ordenes.filter(o => o.vehiculo?.id === vehiculo.id);
          return (
            <div key={vehiculo.id} className="vehiculo-card">
              <div className="vehiculo-header">
                <span className="vehiculo-icon">🚗</span>
                <span>{vehiculo.marca} {vehiculo.modelo} ({vehiculo.placa})</span>
                <div>
                  <button className="estado-btn activo">Activo</button>
                  {onEdit && onDelete && (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => onEdit(vehiculo)}
                        title="Editar vehículo"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(vehiculo.id)}
                        title="Eliminar vehículo"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="vehiculo-details">
                <p>Año: {vehiculo.anio}</p>
                <p>Matrícula: {vehiculo.placa}</p>
              </div>
              <div className="vehiculo-owner">
                <p>🔧 Propietario: {vehiculo.cliente?.nombreCompleto || 'N/A'}</p>
                <p>Total Issues: {ordenesVehiculo.length}</p>
              </div>
            </div>
          );
        })}
        {vehiculos.length === 0 && <p>No hay vehículos registrados</p>}
      </div>
    </div>
  );
}

export default VehiculoList;
