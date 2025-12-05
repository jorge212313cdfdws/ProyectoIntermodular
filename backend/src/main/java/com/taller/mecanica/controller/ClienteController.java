package com.taller.mecanica.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodosLosClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> crearCliente(@RequestBody Cliente cliente) {
        try {
            Set<Vehiculo> vehiculos = cliente.getVehiculos();
            if (vehiculos != null) {
                for (Vehiculo v : vehiculos) {
                    if (v.getId() != 0) {
                        Vehiculo vehiculoBD = vehiculoRepository.findById(v.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));
                        v.setId(vehiculoBD.getId());
                    }
                    v.setCliente(cliente);
                }
            }
            Cliente nuevoCliente = clienteRepository.save(cliente);
            return new ResponseEntity<>(nuevoCliente, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al crear cliente: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerClientePorId(@PathVariable("id") Long id) {
        try {
            Cliente cliente = clienteRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al obtener cliente: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCliente(@PathVariable("id") Long id, @RequestBody Cliente detallesCliente) {
        try {
            Cliente cliente = clienteRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

            cliente.setNombreCompleto(detallesCliente.getNombreCompleto());
            cliente.setEmail(detallesCliente.getEmail());
            cliente.setDireccion(detallesCliente.getDireccion());

            Set<Vehiculo> vehiculos = detallesCliente.getVehiculos();
            if (vehiculos != null) {
                for (Vehiculo v : vehiculos) {
                    if (v.getId() != 0) {
                        Vehiculo vehiculoBD = vehiculoRepository.findById(v.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));
                        v.setId(vehiculoBD.getId());
                    }
                    v.setCliente(cliente);
                }
                cliente.setVehiculos(vehiculos);
            }

            Cliente clienteActualizado = clienteRepository.save(cliente);
            return new ResponseEntity<>(clienteActualizado, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar cliente: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Cliente cliente = clienteRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
            clienteRepository.delete(cliente);
            return new ResponseEntity<>("Cliente eliminado correctamente", HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar cliente: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
