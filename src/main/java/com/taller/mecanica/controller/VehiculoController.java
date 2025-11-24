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

import com.taller.mecanica.model.Vehiculo;
import com.taller.mecanica.repository.VehiculoRepository;



@RestController
@RequestMapping("/Vehiculos")

public class VehiculoController {

    @Autowired
    private VehiculoRepository vehiculoRepository; 

    @GetMapping
    public List<Vehiculo> getAll(){
        return vehiculoRepository.findAll(); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> getById(@PathVariable Long id) {
        return vehiculoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build())
    }

    @PostMapping  
    public Vehiculo create(@RequestBody Vehiculo vehiculo){
        return vehiculoRepository.save(vehiculo); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> update(@PathVariable long id, @RequestBody Vehiculo date){

        return vehiculoRepository.findById(id).map((vehiculo) -> {

            vehiculo.setAño(data.getAño()); 
        })
    }
    
}
