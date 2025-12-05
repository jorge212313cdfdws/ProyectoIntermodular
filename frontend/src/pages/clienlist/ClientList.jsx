// pages/ClientList.jsx (versión mejorada)

import React, { useState, useEffect } from 'react';
import { getClients } from '../../services/ClientService';
import ClientForm from '../clientform/ClientForm'; // 🚨 Importamos el formulario

function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // 🚨 Nuevo estado para el formulario

  // Función para obtener los clientes de la API
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError(`No se pudieron cargar los clientes. Por favor, verifica el backend. ${err.message}`);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []); // Se ejecuta solo una vez al montar

  // 🚨 Función para manejar el éxito de la creación
  const handleClientCreated = (newClient) => {
    // 1. Añade el nuevo cliente a la lista inmediatamente
    setClients(prevClients => [...prevClients, newClient]); 
    // 2. Oculta el formulario
    setShowForm(false);
    // 3. (Opcional) Si quieres volver a cargar todos los datos, llama a fetchClients();
  };

  if (loading) return <p>Cargando lista de clientes...</p>;
  if (error) return <div style={{ color: 'red' }}>Error de Carga: {error}</div>;

  return (
    <div>
      <h2>👥 Gestión de Clientes</h2>

      {/* 🚨 BOTÓN PARA MOSTRAR/OCULTAR EL FORMULARIO */}
      <button 
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: '20px', padding: '10px 15px' }}
      >
        {showForm ? 'Cancelar Registro' : '➕ Registrar Nuevo Cliente'}
      </button>

      {/* 🚨 RENDERIZADO CONDICIONAL DEL FORMULARIO */}
      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
          <ClientForm 
            onSuccess={handleClientCreated} // Le pasamos la función para actualizar la lista
            onCancel={() => setShowForm(false)} // Le pasamos la función para cerrar
          />
        </div>
      )}

      {/* TABLA DE LA LISTA */}
      {Array.isArray(clients) && clients.length > 0 ? (
        <table>
          {/* ... (Tu código de thead y tbody) ... */}
           <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfonos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}> 
                <td>{client.id}</td>
                {/* 🚨 NOTA: Las propiedades deben coincidir con tu JSON (nombreCompleto) */}
                <td>{client.nombreCompleto}</td> 
                <td>{client.email}</td>
                {/* 🚨 NOTA: Si telefonos es un array/Set en Java, usa join para mostrarlo */}
                <td>{client.telefonos ? Array.from(client.telefonos).join(', ') : 'N/A'}</td> 
                <td>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes registrados en el sistema. Usa el botón de arriba para agregar uno.</p>
      )}
    </div>
  );
}

export default ClientList;