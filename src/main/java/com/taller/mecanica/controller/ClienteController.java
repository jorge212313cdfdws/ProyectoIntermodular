package com.taller.mecanica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taller.mecanica.model.Cliente;
import com.taller.mecanica.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")

public class ClienteController {

    //genera las dependencias automaticamente 
    @Autowired
    private ClienteRepository clienteRepository;

    // GET ALL
    //recupera todos los clientes de la base de datos 
    @GetMapping
    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    // GET BY ID
    //recupera el cliente de la base de datos según el id que se introduzca 
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getById(@PathVariable Long id) { //ResponseEntity -> devuelve una respuesta HTTP completa para cliente 
        return clienteRepository.findById(id)
                .map(ResponseEntity::ok) //respuesta hhtp (se ha encontrado)
                .orElse(ResponseEntity.notFound().build()); //respuesta hhtp (no se ha encontrado)
    }

    // CREATE
    //se genera un cliente nuevo y se guarda automaticamente en la columna cliente de la base de datos 
    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // UPDATE
    //actualiza un cliente según su id 
    @PutMapping("/{id}") //introducir el id 
    public ResponseEntity<Cliente> update(@PathVariable Long id, @RequestBody Cliente data) { //updatea buscando un cliente por el id y devuelve los datos que tiene que tener un cliente

        return clienteRepository.findById(id).map(cliente -> {

            cliente.setNombreCompleto(data.getNombreCompleto());
            cliente.setEmail(data.getEmail());
            cliente.setDireccion(data.getDireccion());
            cliente.setTelefonos(data.getTelefonos());
           

            return ResponseEntity.ok(clienteRepository.save(cliente));

        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    //borra un cliente mediante el id de este 
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { 
        if (!clienteRepository.existsById(id)) { //si el id del cliente no se encuentra sale el error notfound
            return ResponseEntity.notFound().build();
        }
        clienteRepository.deleteById(id); //si se encuentra lo borra 
        return ResponseEntity.noContent().build(); //devuelve el contenido pero vacío 
    }
}
