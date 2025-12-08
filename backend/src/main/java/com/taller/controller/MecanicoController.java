package com.taller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taller.exception.ResourceNotFoundException;
import com.taller.model.Mecanico;
import com.taller.repository.MecanicoRepository;

@RestController
@RequestMapping("/api/mecanicos")
@CrossOrigin(origins = "*")
public class MecanicoController {

    @Autowired
    private MecanicoRepository mecanicoRepository;

    @GetMapping
    public List<Mecanico> getAllMecanicos() {
        return mecanicoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Mecanico getMecanicoById(@PathVariable Long id) {
        return mecanicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mecánico no encontrado"));
    }

    @PostMapping
    public Mecanico createMecanico(@RequestBody Mecanico mecanico) {
        return mecanicoRepository.save(mecanico);
    }

    @PutMapping("/{id}")
    public Mecanico updateMecanico(@PathVariable Long id, @RequestBody Mecanico detallesMecanico) {
        Mecanico mecanico = mecanicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mecánico no encontrado"));

        mecanico.setNombre(detallesMecanico.getNombre());
        mecanico.setEspecialidad(detallesMecanico.getEspecialidad());
        mecanico.setHorasTrabajadas(detallesMecanico.getHorasTrabajadas());

        return mecanicoRepository.save(mecanico);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMecanico(@PathVariable Long id) {
        Mecanico mecanico = mecanicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mecánico no encontrado"));
        mecanicoRepository.delete(mecanico);
        return ResponseEntity.noContent().build();
    }
}
