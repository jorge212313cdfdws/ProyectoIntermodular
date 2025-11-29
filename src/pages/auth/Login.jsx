import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixedUsers } from "../../data/users"; // <-- import fijo

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Usuarios del localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Combinar con los fijos
    const allUsers = [...fixedUsers, ...storedUsers];

    const userFound = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!userFound) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    // Guardar sesión
    localStorage.setItem("currentUser", JSON.stringify(userFound));

    alert(`Bienvenido ${userFound.username}`);

    if (userFound.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/cliente");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
