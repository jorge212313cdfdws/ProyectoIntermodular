package com.taller.mecanica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taller.mecanica.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
