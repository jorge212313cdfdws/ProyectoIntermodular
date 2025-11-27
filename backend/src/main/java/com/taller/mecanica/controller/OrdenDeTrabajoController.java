package com.taller.mecanica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taller.mecanica.ResourceNotFoundException;
import com.taller.mecanica.model.OrdenDeTrabajo;
import com.taller.mecanica.model.Cliente;
import com.taller.mecanica.model.Vehiculo;
import com.taller.mecanica.model.Mecanico;
import com.taller.mecanica.model.Servicio;
import com.taller.mecanica.repository.OrdenDeTrabajoRepository;
import com.taller.mecanica.repository.ClienteRepository;
import com.taller.mecanica.repository.VehiculoRepository;
import com.taller.mecanica.repository.MecanicoRepository;
import com.taller.mecanica.repository.ServicioRepository;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "*")
public class OrdenDeTrabajoController {

    @Autowired
    private OrdenDeTrabajoRepository ordenRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private MecanicoRepository mecanicoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    // GET ALL
    @GetMapping
    public List<OrdenDeTrabajo> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public OrdenDeTrabajo getOrdenById(@PathVariable Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden de trabajo no encontrada"));
    }

    // CREATE
    @PostMapping
    public OrdenDeTrabajo createOrden(@RequestBody OrdenDeTrabajo orden) {

        // Validar cliente
        if (orden.getCliente() != null && orden.getCliente().getId() != null) {
            Cliente cliente = clienteRepository.findById(orden.getCliente().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
            orden.setCliente(cliente);
        }

        // Validar vehiculo
        if (orden.getVehiculo() != null && orden.getVehiculo().getId() != null) {
            Vehiculo vehiculo = vehiculoRepository.findById(orden.getVehiculo().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));
            orden.setVehiculo(vehiculo);
        }

        // Validar mecanico
        if (orden.getMecanico() != null && orden.getMecanico().getId() != null) {
            Mecanico mecanico = mecanicoRepository.findById(orden.getMecanico().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Mecánico no encontrado"));
            orden.setMecanico(mecanico);
        }

        // Validar servicios
        if (orden.getServicios() != null) {
            for (int i = 0; i < orden.getServicios().size(); i++) {
                Servicio servicio = orden.getServicios().get(i);
                if (servicio.getId() != null) {
                    Servicio servicioBD = servicioRepository.findById(servicio.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
                    orden.getServicios().set(i, servicioBD);
                }
            }
        }

        return ordenRepository.save(orden);
    }

    // UPDATE
    @PutMapping("/{id}")
    public OrdenDeTrabajo updateOrden(@PathVariable Long id, @RequestBody OrdenDeTrabajo detalles) {
        OrdenDeTrabajo orden = ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden de trabajo no encontrada"));

        orden.setFechaCreacion(detalles.getFechaCreacion());
        orden.setDescripcion(detalles.getDescripcion());
        orden.setCostoTotal(detalles.getCostoTotal());

        // Validar cliente
        if (detalles.getCliente() != null && detalles.getCliente().getId() != null) {
            Cliente cliente = clienteRepository.findById(detalles.getCliente().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
            orden.setCliente(cliente);
        }

        // Validar vehiculo
        if (detalles.getVehiculo() != null && detalles.getVehiculo().getId() != null) {
            Vehiculo vehiculo = vehiculoRepository.findById(detalles.getVehiculo().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));
            orden.setVehiculo(vehiculo);
        }

        // Validar mecanico
        if (detalles.getMecanico() != null && detalles.getMecanico().getId() != null) {
            Mecanico mecanico = mecanicoRepository.findById(detalles.getMecanico().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Mecánico no encontrado"));
            orden.setMecanico(mecanico);
        }

        // Validar servicios
        if (detalles.getServicios() != null) {
            for (int i = 0; i < detalles.getServicios().size(); i++) {
                Servicio servicio = detalles.getServicios().get(i);
                if (servicio.getId() != null) {
                    Servicio servicioBD = servicioRepository.findById(servicio.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
                    detalles.getServicios().set(i, servicioBD);
                }
            }
            orden.setServicios(detalles.getServicios());
        }

        return ordenRepository.save(orden);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrden(@PathVariable Long id) {
        OrdenDeTrabajo orden = ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orden de trabajo no encontrada"));
        ordenRepository.delete(orden);
        return ResponseEntity.noContent().build();
    }
}
