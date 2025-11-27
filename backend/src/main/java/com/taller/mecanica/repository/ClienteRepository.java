package com.taller.mecanica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taller.mecanica.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    //Aquí van los métodos personalizados en caso de que sean necesarios 
}
