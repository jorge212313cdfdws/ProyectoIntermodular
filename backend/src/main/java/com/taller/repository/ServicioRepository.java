package com.taller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.model.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}
