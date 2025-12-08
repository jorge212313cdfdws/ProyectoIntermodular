function ClienteList({ clientes, onEdit, onDelete }) {
  return (
    <div className="content-section">
      <h3>Lista de Clientes</h3>
      <p className="section-subtitle">Gestión de clientes/Vehiculos</p>
      <div className="clientes-list">
        {clientes.map((cliente) => (
          <div key={cliente.id}>
            <div className="cliente-item">
              <div className="cliente-info">
                <span className="cliente-icon">👤</span>
                <div>
                  <p className="cliente-nombre">{cliente.nombreCompleto}</p>
                  <p className="cliente-email">{cliente.email}</p>
                  <p className="cliente-direccion">📍 {cliente.direccion}</p>
                </div>
              </div>
              <div className="cliente-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => onEdit(cliente)}
                  title="Editar cliente"
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(cliente.id)}
                  title="Eliminar cliente"
                >
                  🗑️
                </button>
              </div>
            </div>
            {cliente.vehiculos && cliente.vehiculos.length > 0 && (
              <div className="vehiculos-section">
                <p className="vehiculos-label">Vehículos:</p>
                {cliente.vehiculos.map((vehiculo) => (
                  <p key={vehiculo.id} className="vehiculo-info">
                    {vehiculo.marca} {vehiculo.modelo} ({vehiculo.placa})
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
        {clientes.length === 0 && <p>No hay clientes registrados</p>}
      </div>
    </div>
  );
}

export default ClienteList;
