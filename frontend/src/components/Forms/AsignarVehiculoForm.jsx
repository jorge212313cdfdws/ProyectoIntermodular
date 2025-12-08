import { useState } from "react";
import "./Forms.css";

function AsignarVehiculoForm({ onSubmit, onCancel, vehiculos, clientes }) {
  const [formData, setFormData] = useState({
    vehiculoId: "",
    mecanicoId: ""
  });

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
      <h2>Asignar Vehículo</h2>
      <p className="form-subtitle">Asignación de Trabajo sobre un Vehículo</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehículo:</label>
          <select
            name="vehiculoId"
            value={formData.vehiculoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar vehículo</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.id} value={vehiculo.id}>
                {vehiculo.marca} {vehiculo.modelo} - {vehiculo.placa}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Mecánico:</label>
          <select
            name="mecanicoId"
            value={formData.mecanicoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar mecánico</option>
            {clientes.filter(c => c.role === 'mecanico').map((mecanico) => (
              <option key={mecanico.id} value={mecanico.id}>
                {mecanico.nombreCompleto}
              </option>
            ))}
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

export default AsignarVehiculoForm;
