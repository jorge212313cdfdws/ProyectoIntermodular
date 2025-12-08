import { useState, useEffect } from "react";
import "./Forms.css";

function ClienteForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    direccion: "",
    password: "",
    role: "cliente"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombreCompleto: initialData.nombreCompleto || "",
        email: initialData.email || "",
        direccion: initialData.direccion || "",
        password: "",
        role: initialData.role || "cliente"
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Editar Cliente" : "Crear nuevo Cliente"}</h2>
      <p className="form-subtitle">{initialData ? "Modificación de Cliente Existente" : "Creación de Nuevo Cliente"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!initialData}
            minLength="6"
            placeholder={initialData ? "Dejar vacío para mantener actual" : ""}
          />
        </div>

        <div className="form-group">
          <label>Rol:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
            <option value="mecanico">Mecánico</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn-submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;
