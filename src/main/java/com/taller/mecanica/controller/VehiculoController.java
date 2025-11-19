package com.taller.mecanica.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taller.mecanica.model.Vehiculos;
import com.taller.mecanica.repository.VehiculosRepository;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/Vehiculos")

public class VehiculoController {

    private final VehiculosRepository vehiculosRepository;
    
    public VehiculoController(VehiculosRepository vehiculosRepository) {
        this.vehiculosRepository = vehiculosRepository;
    }

    @GetMapping
    public List<Vehiculos> listado() {
        return vehiculosRepository.findAll();
    }
    
    
}
