import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClienteList from "../components/ClienteList/ClienteList";

describe("ClienteList", () => {
  const clientesMock = [
    {
      id: 1,
      nombreCompleto: "Juan Pérez",
      email: "juan@mail.com",
      direccion: "Calle Falsa 123",
      vehiculos: [
        { id: 1, marca: "Toyota", modelo: "Corolla", placa: "ABC123" },
        { id: 2, marca: "Honda", modelo: "Civic", placa: "XYZ789" },
      ],
    },
  ];

  it("muestra 'No hay clientes registrados' cuando no hay clientes", () => {
    render(<ClienteList clientes={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("No hay clientes registrados")).toBeInTheDocument();
  });

  it("muestra datos completos de un cliente y sus vehículos", () => {
    render(<ClienteList clientes={clientesMock} onEdit={() => {}} onDelete={() => {}} />);

    // Datos del cliente
    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText(/juan@mail.com/)).toBeInTheDocument();
    expect(screen.getByText(/Calle Falsa 123/)).toBeInTheDocument();

    // Vehículos (regex para saltos de línea y espacios)
    expect(screen.getByText(/Toyota.*Corolla.*ABC123/s)).toBeInTheDocument();
    expect(screen.getByText(/Honda.*Civic.*XYZ789/s)).toBeInTheDocument();
  });

  it("llama a onEdit al hacer click en el botón editar", () => {
    const onEditMock = vi.fn();
    render(<ClienteList clientes={clientesMock} onEdit={onEditMock} onDelete={() => {}} />);
    const editButton = screen.getByTitle("Editar cliente");
    fireEvent.click(editButton);
    expect(onEditMock).toHaveBeenCalledWith(clientesMock[0]);
  });

  it("llama a onDelete al hacer click en el botón eliminar", () => {
    const onDeleteMock = vi.fn();
    render(<ClienteList clientes={clientesMock} onEdit={() => {}} onDelete={onDeleteMock} />);
    const deleteButton = screen.getByTitle("Eliminar cliente");
    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith(clientesMock[0].id);
  });
});