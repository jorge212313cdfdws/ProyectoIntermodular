import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  console.log('Usuarios registrados:', users); // <-- ver qué hay
  const user = users.find(
    u => u.username.trim() === username.trim() && u.password === password
  );

  console.log('Usuario encontrado:', user);

  if (!user) {
    alert('Usuario o contraseña incorrecta');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  alert('Login exitoso');
  navigate('/');
};

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>Usuario:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label>Contraseña:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
