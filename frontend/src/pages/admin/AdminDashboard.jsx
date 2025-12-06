import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
      return;
    }

    setAdminData(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!adminData) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Panel de Administrador</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Cerrar sesión
        </button>
      </div>
      <p>Bienvenido {adminData.nombreCompleto}</p>
      <p>Email: {adminData.email}</p>
      
      <div style={{ marginTop: "2rem", background: "#f0f8ff", padding: "1.5rem", borderRadius: "8px" }}>
        <h3>Próximamente</h3>
        <ul>
          <li>Gestión de clientes</li>
          <li>Gestión de vehículos</li>
          <li>Órdenes de trabajo</li>
          <li>Reportes</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
