import { useState, useEffect } from "react";
import "./Forms.css";

function OrdenForm({ onSubmit, onCancel, vehiculos, clientes, initialData }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    estado: "Pendiente",
    vehiculo: { id: "" },
    cliente: { id: "" }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        precio: initialData.costoTotal || "",
        estado: initialData.estado || "Pendiente",
        vehiculo: { id: initialData.vehiculo?.id || "" },
        cliente: { id: initialData.cliente?.id || "" }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vehiculoId") {
      setFormData({
        ...formData,
        vehiculo: { id: value }
      });
    } else if (name === "clienteId") {
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
    const ordenData = {
      descripcion: formData.descripcion,
      costoTotal: parseFloat(formData.precio),
      fechaCreacion: new Date().toISOString().split('T')[0],
      vehiculo: { id: parseInt(formData.vehiculo.id) },
      cliente: { id: parseInt(formData.cliente.id) }
    };
    onSubmit(ordenData);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Editar Issue" : "Crear nueva Issue"}</h2>
      <p className="form-subtitle">{initialData ? "Modificación de Issue Existente" : "Creación de Nuevos Issues"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehículo:</label>
          <select
            name="vehiculoId"
            value={formData.vehiculo.id}
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

        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completado">Completado</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn-submit">
            {initialData ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrdenForm;
