import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya existe
    const exists = users.some((u) => u.username === username);
    if (exists) {
      alert("El usuario ya existe");
      return;
    }

    const newUser = {
      username,
      password,
      role: "cliente"
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrado con éxito");
    navigate("/login");
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
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

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
