package com.taller.mecanica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.mecanica.model.OrdenDeTrabajo;

@Repository
public interface OrdenDeTrabajoRepository extends JpaRepository<OrdenDeTrabajo, Long> {
    // Puedes agregar consultas personalizadas si las necesitas más adelante
}
