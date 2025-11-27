package com.taller.mecanica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.taller.mecanica.model.Vehiculo;
import com.taller.mecanica.repository.ClienteRepository;
import com.taller.mecanica.repository.VehiculoRepository;


@CrossOrigin(origins = "*") // Permite solicitudes desde Ionic
@RestController
@RequestMapping("/Vehiculos")

public class VehiculoController {

    @Autowired
    private VehiculoRepository vehiculoRepository; 

    @Autowired
    private ClienteRepository clienteReposiyoty; 

    @GetMapping
    public List<Vehiculo> getAll(){
        return vehiculoRepository.findAll(); 
    }
    
    @PostMapping  
    public Vehiculo create(@RequestBody Vehiculo vehiculo){
        return vehiculoRepository.save(vehiculo); 
    }

    @GetMapping("/{id}")
    public Vehiculo obtenerVehiculoPorId(@PathVariable("id")Long id){
        return vehiculoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado")); 
    }

    @PutMapping("/{id}")
    public Vehiculo actualizarVehiculo(@PathVariable("id") Long id, @RequestBody Vehiculo detallesVehiculo){

        Vehiculo vehiculo = vehiculoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Vehiculo no encontrado")); 

        vehiculo.setMarca(detallesVehiculo.getMarca()); 

        return vehiculoRepository.save(vehiculo); 
    }
    
    @DeleteMapping("/{id}")
public Vehiculo eliminarVehiculo(@PathVariable("id") Long id){
    Vehiculo vehiculo = vehiculoRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Vehiculo no encontrado"));

    vehiculoRepository.deleteById(id);
    return vehiculo; 
} 

}
