package com.taller.mecanica.services;

import org.springframework.stereotype.Service;
import com.taller.mecanica.repository.ClienteRepository; 
import org.springframework.stereotype.Service;

@Service
public class ClienteService {
    
    private final ClienteRepository repo; 

    public ClienteService(ClienteRpository repo){
        this.repo = repo; 
    }

    public List<Cliente> findAll() {
        return repo.findAll(); 
    }

    public Cliente save(Cliente cliente) {
        return repo.save(cliente); 
    }
}
