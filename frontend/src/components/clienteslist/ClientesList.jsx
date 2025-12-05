import { useEffect, useState } from "react";

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>{cliente.nombreCompleto}</strong>
            {cliente.vehiculos.length > 0 && (
              <ul>
                {cliente.vehiculos.map((vehiculo) => (
                  <li key={vehiculo.id}>
                    {vehiculo.marca} {vehiculo.modelo} ({vehiculo.placa})
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
