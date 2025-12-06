package com.taller.mecanica.service;

import com.taller.mecanica.model.Cliente;
import com.taller.mecanica.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    // Inyecta el repositorio para poder usar sus métodos
    @Autowired
    private ClienteRepository clienteRepository;

    // --- MÉTODOS QUE YA TENÍAS ---
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Cliente createCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // --- MÉTODOS NUEVOS QUE SOLUCIONAN EL ERROR ---

    /**
     * Busca un cliente por su ID.
     * Devuelve un Optional, que puede contener un cliente o estar vacío si no se encuentra.
     */
    public Optional<Cliente> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    /**
     * Actualiza un cliente existente.
     * Primero busca el cliente, y si existe, actualiza sus datos y lo guarda.
     * Si no existe, lanza una excepción.
     */
    public Cliente updateCliente(Long id, Cliente clienteDetails) {
        // Busca el cliente existente
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id :: " + id));

        // Actualiza los campos con los nuevos datos
        cliente.setNombreCompleto(clienteDetails.getNombreCompleto());
        cliente.setEmail(clienteDetails.getEmail());
        cliente.setDireccion(clienteDetails.getDireccion());

        // Guarda y devuelve el cliente actualizado
        return clienteRepository.save(cliente);
    }

    /**
     * Borra un cliente por su ID.
     * Primero comprueba si el cliente existe para evitar errores.
     * Si no existe, lanza una excepción.
     */
    public void deleteCliente(Long id) {
        // Comprueba si el cliente existe antes de intentar borrarlo
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente no encontrado con id :: " + id);
        }
        clienteRepository.deleteById(id);
    }
}