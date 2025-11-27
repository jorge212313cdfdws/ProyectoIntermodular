import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido {user?.username}</p>
    </div>
  );
}

export default AdminDashboard;
