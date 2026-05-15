function MecanicoList({ mecanicos, onEdit, onDelete }) {
  return (
    <div className="content-section">
      <h3>Lista de Mecánicos</h3>
      <p className="section-subtitle">Personal técnico del taller</p>

      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
          paddingBottom: "0.4rem",
          borderBottom: "2px solid #d97706"
        }}>
          <span style={{ fontSize: "1.1rem" }}>🔧</span>
          <h4 style={{ margin: 0, color: "#d97706", fontSize: "0.95rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Mecánicos
          </h4>
          <span style={{
            marginLeft: "auto",
            background: "#fef3c7",
            color: "#d97706",
            borderRadius: "999px",
            padding: "1px 10px",
            fontSize: "0.8rem",
            fontWeight: 600
          }}>
            {mecanicos.length}
          </span>
        </div>

        {mecanicos.length === 0 && <p>No hay mecánicos registrados</p>}

        {mecanicos.map((mecanico) => (
          <div key={mecanico.id} className="cliente-item">
            <div className="cliente-info">
              <span className="cliente-icon">🔧</span>
              <div>
                <p className="cliente-nombre">{mecanico.nombre}</p>
                <p className="cliente-email">🛠️ {mecanico.especialidad}</p>
                <p className="cliente-direccion">⏱️ {mecanico.horasTrabajadas}h trabajadas</p>
              </div>
            </div>
            {onEdit && onDelete && (
              <div className="cliente-actions">
                <button className="edit-btn" onClick={() => onEdit(mecanico)} title="Editar mecánico">✏️</button>
                <button className="delete-btn" onClick={() => onDelete(mecanico.id)} title="Eliminar mecánico">🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MecanicoList;
