package com.taller.mecanica.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.taller.mecanica.model.Cliente;
import com.taller.mecanica.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Cliente createCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}
