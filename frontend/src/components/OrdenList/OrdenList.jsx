function OrdenList({ ordenes, onEdit, onDelete }) {
  return (
    <div className="content-section">
      <h3>Lista de Issues</h3>
      <p className="section-subtitle">Problemas Registrados en el Taller</p>
      <div className="issues-list">
        {ordenes.map((orden) => (
          <div key={orden.id} className="issue-item">
            <div className="issue-header">
              <div>
                <span className="issue-icon">⚙️</span>
                <span>{orden.descripcion || 'Sin descripción'}</span>
              </div>
              <div className="issue-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => onEdit(orden)}
                  title="Editar orden"
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(orden.id)}
                  title="Eliminar orden"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="issue-description">Fecha: {orden.fechaCreacion}</p>
            <p className="issue-vehicle">
              🚗 {orden.vehiculo?.marca} {orden.vehiculo?.modelo} ({orden.vehiculo?.placa}) - {orden.cliente?.nombreCompleto}
            </p>
            <p className="issue-service">💰 Costo Total: ${orden.costoTotal?.toFixed(2) || '0.00'}</p>
            {orden.mecanico && (
              <p className="issue-service">🔧 Mecánico: {orden.mecanico.nombreCompleto}</p>
            )}
            {orden.servicios && orden.servicios.length > 0 && (
              <div className="issue-servicios">
                <p className="issue-service">📋 Servicios:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  {orden.servicios.map((servicio) => (
                    <li key={servicio.id}>
                      {servicio.nombre} - ${servicio.precioBase?.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        {ordenes.length === 0 && <p>No hay órdenes de trabajo registradas</p>}
      </div>
    </div>
  );
}

export default OrdenList;
