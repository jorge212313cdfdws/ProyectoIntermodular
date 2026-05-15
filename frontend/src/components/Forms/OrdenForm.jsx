import { useState, useEffect } from "react";
import "./Forms.css";

function OrdenForm({ onSubmit, onCancel, vehiculos, clientes, mecanicos = [], initialData }) {
  const [formData, setFormData] = useState({
    descripcion: "",
    costoTotal: "",
    vehiculo: { id: "" },
    cliente: { id: "" },
    mecanico: { id: "" }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        descripcion: initialData.descripcion || "",
        costoTotal: initialData.costoTotal || "",
        vehiculo: { id: initialData.vehiculo?.id || "" },
        cliente: { id: initialData.cliente?.id || "" },
        mecanico: { id: initialData.mecanico?.id || "" }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vehiculoId") {
      setFormData({ ...formData, vehiculo: { id: value } });
    } else if (name === "clienteId") {
      setFormData({ ...formData, cliente: { id: value } });
    } else if (name === "mecanicoId") {
      setFormData({ ...formData, mecanico: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ordenData = {
      descripcion: formData.descripcion,
      costoTotal: parseFloat(formData.costoTotal),
      fechaCreacion: new Date().toISOString().split("T")[0],
      vehiculo: { id: parseInt(formData.vehiculo.id) },
      cliente: { id: parseInt(formData.cliente.id) },
      ...(formData.mecanico.id && { mecanico: { id: parseInt(formData.mecanico.id) } })
    };
    onSubmit(ordenData);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Editar Orden de Trabajo" : "Nueva Orden de Trabajo"}</h2>
      <p className="form-subtitle">
        {initialData ? "Modificar orden existente" : "Registrar nueva orden en el taller"}
      </p>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Cliente:</label>
          <select name="clienteId" value={formData.cliente.id} onChange={handleChange} required>
            <option value="">Seleccionar cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nombreCompleto}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Vehículo:</label>
          <select name="vehiculoId" value={formData.vehiculo.id} onChange={handleChange} required>
            <option value="">Seleccionar vehículo</option>
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.marca} {v.modelo} — {v.placa}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Mecánico asignado:</label>
          <select name="mecanicoId" value={formData.mecanico.id} onChange={handleChange}>
            <option value="">Sin asignar</option>
            {mecanicos.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre} — {m.especialidad}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Descripción del trabajo:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            placeholder="Describe el trabajo a realizar..."
          />
        </div>

        <div className="form-group">
          <label>Costo total (€):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="costoTotal"
            value={formData.costoTotal}
            onChange={handleChange}
            required
            placeholder="0.00"
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-submit">
            {initialData ? "Actualizar" : "Crear orden"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrdenForm;
