package com.taller.mecanica.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taller.mecanica.model.Cliente;
import com.taller.mecanica.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
// Cambiado para permitir peticiones desde cualquier origen, incluida tu app Android
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // --- OBTENER TODOS (Ya lo tenías) ---
    @GetMapping
    public ResponseEntity<List<Cliente>> getClientes() {
        return ResponseEntity.ok(clienteService.getAllClientes());
    }

    // --- CREAR (Ya lo tenías) ---
    @PostMapping
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Cliente newCliente = clienteService.createCliente(cliente);
        return ResponseEntity.ok(newCliente);
    }

    // --- OBTENER POR ID (Añadido) ---
    // Necesario para que la pantalla de "Actualizar" pueda cargar los datos del cliente.
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        // Asumo que tu servicio tiene un método para buscar por ID.
        // Si no lo encuentra, podría lanzar una excepción.
        return clienteService.getClienteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- ACTUALIZAR (Añadido) ---
    // Este es el endpoint que responde a la petición PUT de tu app.
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
        try {
            Cliente updatedCliente = clienteService.updateCliente(id, clienteDetails);
            return ResponseEntity.ok(updatedCliente);
        } catch (RuntimeException e) {
            // Esto se activa si el cliente con ese ID no se encuentra
            return ResponseEntity.notFound().build();
        }
    }

    // --- BORRAR (Añadido) ---
    // Este es el endpoint que responde a la petición DELETE de tu app.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        try {
            clienteService.deleteCliente(id);
            return ResponseEntity.noContent().build(); // noContent() es un 204, ideal para borrados exitosos
        } catch (RuntimeException e) {
            // Esto se activa si el cliente con ese ID no se encuentra
            return ResponseEntity.notFound().build();
        }
    }
}