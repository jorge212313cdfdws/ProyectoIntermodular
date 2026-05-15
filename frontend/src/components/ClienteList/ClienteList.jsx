const ROLE_CONFIG = {
  admin:    { label: "Administradores", icon: "🛡️", color: "#7c3aed" },
  cliente:  { label: "Clientes",        icon: "👤", color: "#2563eb" },
};

function UserCard({ usuario, onEdit, onDelete }) {
  const role = ROLE_CONFIG[usuario.role] || { label: usuario.role || "Sin rol", icon: "❓", color: "#6b7280" };
  return (
    <div className="cliente-item">
      <div className="cliente-info">
        <span className="cliente-icon">{role.icon}</span>
        <div>
          <p className="cliente-nombre">{usuario.nombreCompleto}</p>
          <p className="cliente-email">{usuario.email}</p>
          <p className="cliente-direccion">📍 {usuario.direccion}</p>
        </div>
      </div>
      {onEdit && onDelete && (
        <div className="cliente-actions">
          <button className="edit-btn" onClick={() => onEdit(usuario)} title="Editar">✏️</button>
          <button className="delete-btn" onClick={() => onDelete(usuario.id)} title="Eliminar">🗑️</button>
        </div>
      )}
    </div>
  );
}

function RoleGroup({ title, icon, color, usuarios, onEdit, onDelete }) {
  if (usuarios.length === 0) return null;
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.75rem",
        paddingBottom: "0.4rem",
        borderBottom: `2px solid ${color}22`
      }}>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <h4 style={{ margin: 0, color, fontSize: "0.95rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {title}
        </h4>
        <span style={{
          marginLeft: "auto",
          background: `${color}18`,
          color,
          borderRadius: "999px",
          padding: "1px 10px",
          fontSize: "0.8rem",
          fontWeight: 600
        }}>
          {usuarios.length}
        </span>
      </div>
      {usuarios.map((u) => (
        <UserCard key={u.id} usuario={u} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

function ClienteList({ clientes, onEdit, onDelete }) {
  const admins   = clientes.filter((c) => c.role === "admin");
  const clientes_ = clientes.filter((c) => c.role === "cliente" || !c.role);

  return (
    <div className="content-section">
      <h3>Lista de Usuarios</h3>
      <p className="section-subtitle">Usuarios registrados agrupados por rol</p>

      {clientes.length === 0 && <p>No hay usuarios registrados</p>}

      <RoleGroup
        title="Administradores"
        icon="🛡️"
        color="#7c3aed"
        usuarios={admins}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <RoleGroup
        title="Clientes"
        icon="👤"
        color="#2563eb"
        usuarios={clientes_}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default ClienteList;