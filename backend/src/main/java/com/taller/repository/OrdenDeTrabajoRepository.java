package com.taller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.model.OrdenDeTrabajo;
import java.util.List;

@Repository
public interface OrdenDeTrabajoRepository extends JpaRepository<OrdenDeTrabajo, Long> {
    List<OrdenDeTrabajo> findByClienteId(Long clienteId);
}
