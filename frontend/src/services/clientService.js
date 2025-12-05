// services/clientService.js

const API_BASE_URL = 'http://localhost:8080/api/clients'; // **¡Revisa y cambia esta URL si es necesario!**

/**
 * Obtiene todos los clientes.
 */
export const getClients = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/clientes'); 
    
    // 1. **Manejo de Respuestas NO OK (como 500 o 403)**
    if (!response.ok) {
        // Intentamos leer el body como texto primero, porque podría no ser JSON
        const errorBody = await response.text(); 
        
        // Lanzamos un error que el componente capturará
        throw new Error(`API Error ${response.status}: ${errorBody.substring(0, 100)}`);
    }

    // 2. **Solo intentamos parsear JSON si la respuesta fue OK (200-299)**
    const data = await response.json(); 
    return data;
    
  } catch (error) {
    console.error("Fallo en la llamada a la API:", error);
    throw error; 
  }
};

/**
 * Crea un nuevo cliente (POST).
 * @param {Object} clientData - Los datos del nuevo cliente (nombre, email, teléfono, etc.).
 */
export const createClient = async (clientData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST', // Método POST para crear
      headers: {
        'Content-Type': 'application/json', // Indicamos que enviamos JSON
        // Aquí podrías añadir un token de autorización si lo usas: 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData), // Convertimos el objeto JavaScript a una cadena JSON
    });

    if (!response.ok) {
      // Intentamos leer el mensaje de error del backend si existe
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al crear el cliente: ${response.statusText}`);
    }

    // Devolvemos el cliente recién creado (útil para actualizar el estado sin recargar)
    return await response.json();

  } catch (error) {
    console.error("Fallo al crear el cliente:", error);
    throw error;
  }
};

// **Pendiente:** Añadir funciones para `getClientById`, `updateClient`, `deleteClient`.