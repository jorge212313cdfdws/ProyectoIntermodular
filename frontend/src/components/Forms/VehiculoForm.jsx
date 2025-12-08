import { useState, useEffect } from "react";
import "./Forms.css";

function VehiculoForm({ onSubmit, onCancel, clientes, initialData }) {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    anio: "",
    placa: "",
    cliente: { id: "" }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        marca: initialData.marca || "",
        modelo: initialData.modelo || "",
        anio: initialData.anio || "",
        placa: initialData.placa || "",
        cliente: { id: initialData.cliente?.id || "" }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "clienteId") {
      setFormData({
        ...formData,
        cliente: { id: value }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Editar Vehículo" : "Crear nuevo Vehículo"}</h2>
      <p className="form-subtitle">Carros y sus Vehiculos</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Año:</label>
          <input
            type="number"
            name="anio"
            value={formData.anio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Matrícula:</label>
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cliente:</label>
          <select
            name="clienteId"
            value={formData.cliente.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombreCompleto}
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

export default VehiculoForm;
