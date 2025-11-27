import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // para simular el registro
  const navigate = useNavigate();

  function handleSubmit(e) {
  e.preventDefault();

  // Aquí solo simulamos que el registro fue exitoso, sin loguear
  alert("Registro exitoso. Por favor, inicia sesión.");
  navigate("/login"); // Redirige al login
}


  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
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
