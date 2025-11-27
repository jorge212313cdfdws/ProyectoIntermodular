import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ClientView from "../../components/ClientView/ClientView";

// Datos de ejemplo
const clients = [
  { id: "1", name: "Juan Pérez", email: "juan@mail.com", phone: "123456789", address: "Calle Falsa 123" },
  { id: "2", name: "Ana Gómez", email: "ana@mail.com", phone: "987654321", address: "Avenida Siempre Viva 742" }
];

const cars = [
  { id: "1", clientId: "1", brand: "Toyota", model: "Corolla", year: 2020, plate: "ABC123", vin: "1HGCM82633A004352" },
  { id: "2", clientId: "2", brand: "Honda", model: "Civic", year: 2019, plate: "XYZ789", vin: "2HGCM82633A004353" }
];

const issues = [
  { id: "1", carId: "1", title: "Cambio de aceite", description: "Aceite del motor", status: "completed", priority: "low", createdAt: "2025-11-27" },
  { id: "2", carId: "2", title: "Frenos", description: "Cambio de pastillas", status: "in_progress", priority: "high", createdAt: "2025-11-25" }
];

function ClienteDashboard() {
  const { user } = useAuth();
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id);

  return (
    <div>
      <h1>Panel de Cliente</h1>
      <p>Hola {user?.username}</p>

      <ClientView 
        clients={clients} 
        cars={cars} 
        issues={issues} 
        selectedClientId={selectedClientId} 
        setSelectedClientId={setSelectedClientId} 
      />
    </div>
  );
}

export default ClienteDashboard;