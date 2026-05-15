import { useState, useEffect } from "react";
import "./Forms.css";

function MecanicoForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        especialidad: initialData.especialidad || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre: formData.nombre,
      especialidad: formData.especialidad,
      horasTrabajadas: initialData?.horasTrabajadas ?? 0
    });
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Editar Mecánico" : "Nuevo Mecánico"}</h2>
      <p className="form-subtitle">
        {initialData ? "Modificar datos del mecánico" : "Registrar nuevo mecánico en el taller"}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Nombre del mecánico"
          />
        </div>

        <div className="form-group">
          <label>Especialidad:</label>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            required
            placeholder="Ej: Motor, Electricidad, Chapa..."
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn-submit">
            {initialData ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MecanicoForm;
