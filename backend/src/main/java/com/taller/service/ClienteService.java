package com.taller.service;

import com.taller.model.Cliente;
import com.taller.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> getClienteByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    public Cliente createCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente updateCliente(Long id, Cliente clienteDetails) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setNombreCompleto(clienteDetails.getNombreCompleto());
            cliente.setEmail(clienteDetails.getEmail());
            cliente.setDireccion(clienteDetails.getDireccion());
            if (clienteDetails.getVehiculos() != null) {
                cliente.setVehiculos(clienteDetails.getVehiculos());
            }
            return clienteRepository.save(cliente);
        }).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }

}
