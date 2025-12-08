import { useEffect, useState } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null); // cliente a ver/editar
  const [form, setForm] = useState({ nombreCompleto: "", email: "", direccion: "" });

  // Obtener todos los clientes
  const fetchClientes = async () => {
    const res = await fetch("/api/clientes");
    const data = await res.json();
    setClientes(data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Crear un cliente
  const crearCliente = async () => {
    await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombreCompleto: "", email: "", direccion: "" });
    fetchClientes();
  };

  // Ver cliente por ID
  const verCliente = async (id) => {
    const res = await fetch(`/api/clientes/${id}`);
    const data = await res.json();
    setSeleccionado(data);
    setForm({ nombreCompleto: data.nombreCompleto, email: data.email, direccion: data.direccion });
  };

  // Actualizar cliente
  const actualizarCliente = async (id) => {
    await fetch(`/api/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSeleccionado(null);
    setForm({ nombreCompleto: "", email: "", direccion: "" });
    fetchClientes();
  };

  // Borrar cliente
  const borrarCliente = async (id) => {
    await fetch(`/api/clientes/${id}`, { method: "DELETE" });
    if (seleccionado && seleccionado.id === id) setSeleccionado(null);
    fetchClientes();
  };

  return (
    <div>
      <h2>Clientes</h2>

      <div style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>{seleccionado ? "Editar Cliente" : "Nuevo Cliente"}</h3>
        <input
          placeholder="Nombre"
          value={form.nombreCompleto}
          onChange={(e) => setForm({ ...form, nombreCompleto: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Dirección"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
        />
        {seleccionado ? (
          <button onClick={() => actualizarCliente(seleccionado.id)}>Actualizar</button>
        ) : (
          <button onClick={crearCliente}>Crear Cliente</button>
        )}
        {seleccionado && <button onClick={() => setSeleccionado(null)}>Cancelar</button>}
      </div>

      <ul>
        {clientes.map((c) => (
          <li key={c.id}>
            {c.nombreCompleto} - {c.email} - {c.direccion}{" "}
            <button onClick={() => verCliente(c.id)}>Ver / Editar</button>{" "}
            <button onClick={() => borrarCliente(c.id)}>Borrar</button>
          </li>
        ))}
      </ul>

      {seleccionado && (
        <div style={{ marginTop: "1rem", border: "1px solid #aaa", padding: "1rem" }}>
          <h3>Detalles del Cliente</h3>
          <p>ID: {seleccionado.id}</p>
          <p>Nombre: {seleccionado.nombreCompleto}</p>
          <p>Email: {seleccionado.email}</p>
          <p>Dirección: {seleccionado.direccion}</p>
          {seleccionado.vehiculos && seleccionado.vehiculos.length > 0 && (
            <div>
              <h4>Vehículos:</h4>
              <ul>
                {seleccionado.vehiculos.map((v) => (
                  <li key={v.id}>
                    {v.marca} {v.modelo} ({v.anio})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
