package com.taller.mecanica.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taller.mecanica.model.Vehiculo;
import com.taller.mecanica.repository.VehiculoRepository;



@RestController
@RequestMapping("/Vehiculos")

public class VehiculoController {

    private final VehiculoRepository vehiculosRepository;
    
    public VehiculoController(VehiculoRepository vehiculosRepository) {
        this.vehiculosRepository = vehiculosRepository;
    }

    @GetMapping
    public List<Vehiculo> listado() {
        return vehiculosRepository.findAll();
    }
    
    
}
