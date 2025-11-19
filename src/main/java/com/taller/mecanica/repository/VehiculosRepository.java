package com.taller.mecanica.repository;

import com.taller.mecanica.model.Vehiculos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculosRepository extends JpaRepository<Vehiculos, Long> {
}