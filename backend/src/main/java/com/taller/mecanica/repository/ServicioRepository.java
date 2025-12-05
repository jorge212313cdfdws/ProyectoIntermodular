package com.taller.mecanica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.mecanica.model.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    // CRUD completo disponible automáticamente
}
