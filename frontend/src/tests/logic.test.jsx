import { describe, it, expect } from 'vitest';

function isValidClient(cliente) {
  return Boolean(cliente.nombreCompleto && cliente.email && cliente.direccion);
}

function sumarVehiculos(clientes) {
  return clientes.reduce((acc, c) => acc + (c.vehiculos?.length || 0), 0);
}

describe('Lógica de clientes', () => {
  it('debería retornar false si faltan campos de cliente', () => {
    const cliente = { nombreCompleto: '', email: '', direccion: '' };
    expect(isValidClient(cliente)).toBe(false);
  });

  it('debería retornar true si los campos de cliente están completos', () => {
    const cliente = { nombreCompleto: 'Juan Pérez', email: 'juan@mail.com', direccion: 'Calle 123' };
    expect(isValidClient(cliente)).toBe(true);
  });

  it('suma correctamente la cantidad de vehículos de todos los clientes', () => {
    const clientes = [
      { vehiculos: [{}, {}] },
      { vehiculos: [{}] }
    ];
    expect(sumarVehiculos(clientes)).toBe(3);
  });
});