// pages/ClientForm.jsx

import React, { useState } from 'react';
import { createClient } from '../../services/ClientService';

// Define el estado inicial del formulario
const initialFormState = {
  name: '',
  phone: '',
  email: '',
};

function ClientForm({ onSuccess, onCancel }) { // Propiedades opcionales para manejar el éxito o la cancelación
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada a la API para crear el cliente
      const newClient = await createClient(formData); 
      
      setSuccess(true);
      setFormData(initialFormState); // Limpiar el formulario
      console.log("Cliente creado con éxito:", newClient);

      // Si se proporcionó una función onSuccess, la llamamos
      if (onSuccess) {
        onSuccess(newClient);
      }

    } catch (err) {
      // Capturamos el error lanzado en el servicio
      setError(err.message || "Ocurrió un error desconocido al crear el cliente.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>➕ Registrar Nuevo Cliente</h3>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel" // Usamos tel para validación en el navegador
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cliente'}
        </button>
        
        {/* Botón de Cancelar opcional */}
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </form>

      {/* Mensajes de feedback */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Cliente registrado correctamente.</p>}
    </div>
  );
}

export default ClientForm;