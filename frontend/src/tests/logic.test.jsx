import { describe, it, expect, afterEach, vi } from 'vitest';

function isValidClient(cliente) {
  return Boolean(cliente.nombreCompleto && cliente.email && cliente.direccion);
}

function sumarVehiculos(clientes) {
  return clientes.reduce((acc, c) => acc + (c.vehiculos?.length || 0), 0);
}

describe('Lógica de clientes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('isValidClient', () => {
    it('debería retornar false si faltan todos los campos', () => {
      // Arrange
      const cliente = { nombreCompleto: '', email: '', direccion: '' };

      // Act & Assert
      expect(isValidClient(cliente)).toBe(false);
    });

    it('debería retornar true si los campos de cliente están completos', () => {
      // Arrange
      const cliente = { nombreCompleto: 'Juan Pérez', email: 'juan@mail.com', direccion: 'Calle 123' };

      // Act & Assert
      expect(isValidClient(cliente)).toBe(true);
    });

    it('debería retornar false si solo falta email del cliente', () => {
      // Arrange
      const cliente = { nombreCompleto: 'Juan Pérez', email: '', direccion: 'Calle 123' };

      // Act & Assert
      expect(isValidClient(cliente)).toBe(false);
    });

    it('debería retornar false si solo falta dirección del cliente', () => {
      // Arrange
      const cliente = { nombreCompleto: 'Juan Pérez', email: 'juan@mail.com', direccion: '' };

      // Act & Assert
      expect(isValidClient(cliente)).toBe(false);
    });
  });

  describe('sumarVehiculos', () => {
    it('suma correctamente la cantidad de vehículos de todos los clientes', () => {
      // Arrange
      const clientes = [
        { vehiculos: [{}, {}] },
        { vehiculos: [{}] }
      ];

      // Act & Assert
      expect(sumarVehiculos(clientes)).toBe(3);
    });

    it('suma correctamente cuando hay clientes sin vehículos', () => {
      // Arrange
      const clientes = [
        { vehiculos: [{}, {}] },
        { vehiculos: [] },
        { }
      ];

      // Act & Assert
      expect(sumarVehiculos(clientes)).toBe(2);
    });

    it('retorna 0 cuando el array de clientes está vacío', () => {
      // Arrange
      const clientes = [];

      // Act & Assert
      expect(sumarVehiculos(clientes)).toBe(0);
    });
  });
});