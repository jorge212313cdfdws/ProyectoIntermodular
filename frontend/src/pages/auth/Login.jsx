import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './auth.css';

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // Login exitoso
      setSuccess(data.message || 'Iniciando sesión...');
      
      // Guardar token y datos del usuario en localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify({
        id: data.id,
        email: data.email,
        role: data.role,
        nombreCompleto: data.nombreCompleto
      }));

      // Esperar un momento para mostrar el mensaje
      setTimeout(() => {
        if (onClose) onClose();

        // Redirigir según rol
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cliente");
        }
      }, 1000);
    } catch (err) {
      setError('Error de conexión con el servidor');
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <h2>Login</h2>
      <p className="auth-subtitle">Iniciar sesión</p>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <a href="#" className="forgot-password">Forgot password?</a>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}

export default Login;
