package com.taller.mecanica.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taller.mecanica.ResourceNotFoundException;
import com.taller.mecanica.model.Cliente;
import com.taller.mecanica.model.Vehiculo;
import com.taller.mecanica.repository.ClienteRepository;
import com.taller.mecanica.repository.VehiculoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
//implementar http status 
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    // GET ALL
    @GetMapping
    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.findAll();
    }

    // CREATE
    @PostMapping
    public Cliente crearCliente(@RequestBody Cliente cliente) {

        Set<Vehiculo> vehiculos = cliente.getVehiculos();
        if (vehiculos != null) {
            for (Vehiculo v : vehiculos) {
                if (v.getId() != 0) {
                    Vehiculo vehiculoBD = vehiculoRepository.findById(v.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));
                    v.setId(vehiculoBD.getId());
                }
                v.setCliente(cliente); // asignar cliente
            }
        }

        return clienteRepository.save(cliente);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Cliente obtenerClientePorId(@PathVariable("id") Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable("id") Long id, @RequestBody Cliente detallesCliente) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        cliente.setNombreCompleto(detallesCliente.getNombreCompleto());
        cliente.setEmail(detallesCliente.getEmail());
        cliente.setDireccion(detallesCliente.getDireccion());

        // Manejo de vehículos
        Set<Vehiculo> vehiculos = detallesCliente.getVehiculos();
        if (vehiculos != null) {
            for (Vehiculo v : vehiculos) {
                if (v.getId() != 0) {
                    Vehiculo vehiculoBD = vehiculoRepository.findById(v.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));
                    v.setId(vehiculoBD.getId());
                }
                v.setCliente(cliente); // asignar cliente
            }
            cliente.setVehiculos(vehiculos);
        }

        return clienteRepository.save(cliente);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        clienteRepository.delete(cliente);
        return ResponseEntity.noContent().build();
    }
}
