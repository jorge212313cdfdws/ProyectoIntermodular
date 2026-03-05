import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCrudOperations } from '../hooks/useCrudOperations';

// Mock del módulo Toast
vi.mock('../components/Toast/ToastContainer', () => ({
  showToast: vi.fn()
}));

describe('useCrudOperations Hook', () => {
  const mockApiUrl = 'http://localhost:8080/api/clientes';
  const mockToken = 'test-token-123';

  beforeEach(() => {
    // Arrange: Preparar localStorage con token
    localStorage.setItem('authToken', mockToken);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Limpiar mocks después de cada test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('create', () => {
    it('debe enviar POST request con datos y token correcto', async () => {
      // Arrange
      const mockResponse = { ok: true };
      global.fetch.mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => useCrudOperations(mockApiUrl, 'Cliente'));
      const clienteData = { nombreCompleto: 'Juan Pérez', email: 'juan@mail.com' };

      // Act
      await act(async () => {
        await result.current.create(clienteData);
      });

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        mockApiUrl,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mockToken}`
          }),
          body: JSON.stringify(clienteData)
        })
      );
    });

    it('debe llamar a onSuccess si la respuesta es ok', async () => {
      // Arrange
      const mockResponse = { ok: true };
      global.fetch.mockResolvedValueOnce(mockResponse);
      const onSuccessMock = vi.fn();
      const { result } = renderHook(() => useCrudOperations(mockApiUrl, 'Cliente'));

      // Act
      await act(async () => {
        await result.current.create({}, onSuccessMock);
      });

      // Assert
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('debe enviar PUT request al endpoint correcto con ID', async () => {
      // Arrange
      const mockResponse = { ok: true };
      global.fetch.mockResolvedValueOnce(mockResponse);
      const { result } = renderHook(() => useCrudOperations(mockApiUrl, 'Cliente'));
      const clienteData = { nombreCompleto: 'Juan Pérez Actualizado' };

      // Act
      await act(async () => {
        await result.current.update(1, clienteData);
      });

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/1`,
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockToken}`
          })
        })
      );
    });
  });

  describe('remove', () => {
    it('debe preparar dialog de confirmación con mensaje correcto', () => {
      // Arrange
      const { result } = renderHook(() => useCrudOperations(mockApiUrl, 'Cliente'));

      // Act
      act(() => {
        result.current.remove(1, vi.fn());
      });

      // Assert
      expect(result.current.confirmDialog).not.toBeNull();
      expect(result.current.confirmDialog.message).toContain('¿Estás seguro de eliminar este Cliente?');
    });
  });
});
