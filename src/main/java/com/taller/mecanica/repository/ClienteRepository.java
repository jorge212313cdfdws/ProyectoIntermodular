package com.taller.mecanica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.qos.logback.core.net.server.Client;

public interface ClienteRepository extends JpaRepository<Client, Long> {}
