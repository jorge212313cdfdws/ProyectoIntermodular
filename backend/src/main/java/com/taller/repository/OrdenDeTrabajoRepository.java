package com.taller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.model.OrdenDeTrabajo;

@Repository
public interface OrdenDeTrabajoRepository extends JpaRepository<OrdenDeTrabajo, Long> {
}
