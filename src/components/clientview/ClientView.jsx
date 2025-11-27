import "./ClientView.css";
import { User, Car as CarIcon, AlertCircle, Calendar, Phone, Mail, MapPin } from "lucide-react";

function ClientView({ clients, cars, issues, selectedClientId, setSelectedClientId }) {
  const selectedClient = clients.find((c) => c.id === selectedClientId);
  const clientCar = cars.find((c) => c.clientId === selectedClientId);
  const carIssues = clientCar ? issues.filter((i) => i.carId === clientCar.id) : [];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "status pending";
      case "in_progress": return "status in-progress";
      case "completed": return "status completed";
      default: return "status";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low": return "priority low";
      case "medium": return "priority medium";
      case "high": return "priority high";
      default: return "priority";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "Pendiente";
      case "in_progress": return "En Progreso";
      case "completed": return "Completado";
      default: return status;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "low": return "Baja";
      case "medium": return "Media";
      case "high": return "Alta";
      default: return priority;
    }
  };

  return (
    <div className="client-container">
      <div className="card">
        <h2 className="card-title">Seleccionar Cliente</h2>
        <p className="card-description">Elige tu perfil para ver la información</p>

        <select
          className="custom-select"
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(e.target.value)}
        >
          <option value="">Selecciona un cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClient && (
        <div className="two-columns">
          {/* Perfil */}
          <div className="card">
            <h3 className="card-subtitle">
              <User className="icon" /> Mi Perfil
            </h3>

            <div className="info-group">
              <div className="info-item">
                <User className="item-icon" />
                <div>
                  <p className="label">Nombre</p>
                  <p>{selectedClient.name}</p>
                </div>
              </div>

              <div className="info-item">
                <Mail className="item-icon" />
                <div>
                  <p className="label">Email</p>
                  <p>{selectedClient.email}</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="item-icon" />
                <div>
                  <p className="label">Teléfono</p>
                  <p>{selectedClient.phone}</p>
                </div>
              </div>

              <div className="info-item">
                <MapPin className="item-icon" />
                <div>
                  <p className="label">Dirección</p>
                  <p>{selectedClient.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehículo */}
          <div className="card">
            <h3 className="card-subtitle">
              <CarIcon className="icon" /> Mi Vehículo
            </h3>

            {clientCar ? (
              <div className="info-group">
                <div>
                  <p className="label">Marca y Modelo</p>
                  <p>{clientCar.brand} {clientCar.model}</p>
                </div>

                <div>
                  <p className="label">Año</p>
                  <p>{clientCar.year}</p>
                </div>

                <div>
                  <p className="label">Matrícula</p>
                  <p>{clientCar.plate}</p>
                </div>

                <div>
                  <p className="label">VIN</p>
                  <p className="vin">{clientCar.vin}</p>
                </div>
              </div>
            ) : (
              <p className="empty">No hay vehículo asignado</p>
            )}
          </div>
        </div>
      )}

      {/* Historial */}
      {clientCar && (
        <div className="card">
          <h3 className="card-subtitle">
            <AlertCircle className="icon" /> Historial de Reparaciones
          </h3>

          {carIssues.length > 0 ? (
            <div className="issues-list">
              {carIssues.map((issue) => (
                <div key={issue.id} className="issue-card">
                  <div className="issue-header">
                    <div className="issue-info">
                      <h4>{issue.title}</h4>
                      <p>{issue.description}</p>
                    </div>

                    <div className="badges">
                      <span className={getStatusColor(issue.status)}>
                        {getStatusText(issue.status)}
                      </span>
                      <span className={getPriorityColor(issue.priority)}>
                        {getPriorityText(issue.priority)}
                      </span>
                    </div>
                  </div>

                  <div className="issue-date">
                    <Calendar className="item-icon" />
                    {new Date(issue.createdAt).toLocaleDateString("es-ES")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No hay issues registrados</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientView;
