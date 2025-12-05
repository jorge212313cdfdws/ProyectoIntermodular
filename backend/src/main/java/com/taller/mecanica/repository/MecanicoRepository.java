package com.taller.mecanica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.mecanica.model.Mecanico;

@Repository
public interface MecanicoRepository extends JpaRepository<Mecanico, Long> {
    // CRUD completo disponible automáticamente
}
