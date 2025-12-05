import React, { useState } from "react";
import { createClient } from "../../services/ClientService";
import "./ClientForm.css";

const initialForm = {
  nombreCompleto: "",
  email: "",
  direccion: "",
  telefonos: ""
};

function ClientForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Formato esperado por Spring Boot
      const payload = {
        nombreCompleto: formData.nombreCompleto,
        email: formData.email,
        direccion: formData.direccion,
        telefonos: [formData.telefonos]
      };

      const newClient = await createClient(payload);
      setSuccess(true);
      setFormData(initialForm);

      if (onSuccess) onSuccess(newClient);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-form-container">
      <h3>Registrar Nuevo Cliente</h3>

      <form onSubmit={handleSubmit}>
        <label>Nombre Completo:</label>
        <input
          type="text"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />

        <label>Teléfono:</label>
        <input
          type="text"
          name="telefonos"
          value={formData.telefonos}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cliente"}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">Cliente creado con éxito.</p>}
    </div>
  );
}

export default ClientForm;
