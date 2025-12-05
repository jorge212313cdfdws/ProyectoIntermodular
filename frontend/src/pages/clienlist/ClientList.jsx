import React, { useEffect, useState } from "react";
import { getClients } from "../../services/ClientService";
import ClientForm from "../clientform/ClientForm";
import "./ClientList.css";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError("Error cargando clientes: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientCreated = (newClient) => {
    setClients((prev) => [...prev, newClient]);
    setShowForm(false);
  };

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="client-list-container">
      <h2>Gestión de Clientes</h2>

      <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancelar Registro" : "Registrar Nuevo Cliente"}
      </button>

      {showForm && (
        <ClientForm
          onSuccess={handleClientCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Teléfonos</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombreCompleto}</td>
              <td>{c.email}</td>
              <td>{c.telefonos?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
